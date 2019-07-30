const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const JWT = require('../auth/JWT');
const TokenType = require('./TokenType');
const User = require('../models/User');
const Travel = require('../models/Travel');
const UserType = require('./UserType');

ObjectId.prototype.valueOf = function () {
    return this.toString();
};

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        signinUser: {
            type: TokenType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async (parent, { email, password }) => {

                try {
                    const user = await User.findOne({ email });

                    if (!user) {
                        throw new Error(`User with email ${email} doesn't exist`);
                    }

                    if (user.password !== password) {
                        throw new Error('Wrong password');
                    } else {
                        return { token: JWT.createToken(email, user.name) };
                    }
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
        },
        signupUser: {
            type: TokenType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            resolve: async (parent, { email, password, name }) => {

                try {
                    const user = await User.findOne({ email });
                    if (user) {
                        throw new Error(`User with email ${email} already exists`);
                    }

                    await new User({ email, password, name }).save();

                    return { token: JWT.createToken(email, name) };
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
        },
        addNotification: {
            type: UserType,
            args: {
                //email: { type: GraphQLString },
                id: { type: GraphQLString },
                date: { type: GraphQLString },
                origin: { type: GraphQLInt },
                destination: { type: GraphQLInt }
            },
            resolve: async (parent, { date, origin, destination, id }, { token }) => {

                try {

                    if (token) {

                        const { email } = JWT.verifyToken(token);

                        const user = await User.findOne({ email });

                        // Check if user exists in DB
                        if (user) {

                            let travelId;
                            let travel;

                            // If travelId is empty find it by origin, destination and date
                            if (!id) {
                                travel = await Travel.findOne({ origin, destination, date });
                                if (travel) {
                                    travelId = travel._id
                                } else {
                                    throw new Error(`Travel not found. Origin: ${origin}, destination: ${destination}, date: ${date}`);
                                }
                            } else {
                                travelId = mongoose.Types.ObjectId(id);
                                travel = await Travel.findById(travelId);

                                if (!travel) {
                                    throw new Error(`Travel not found. Id: ${travelId}`);
                                }
                            }

                            
                            if (user.notifications.some(notif => notif.travelId.equals(travelId))) {
                                throw new Error(`Such notification already exists. TravelId: ${travelId}, date: ${date}`);
                            } else {
                                user.notifications.push({ travelId, date: travel.date, priceAirplaneLast: travel.priceAirplane, priceHotelLast: travel.priceHotel });
                                await user.save();
                                return user;
                            }
                        } else {
                            throw new Error(`User with email ${email} doesn't exist`);
                        }

                    } else {
                        throw new Error('Unauthorized');
                    }
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
        },
        deleteNotification: {
            type: UserType,
            args: {
                //email: { type: GraphQLString },
                id: { type: GraphQLString }
            },
            resolve: async (parent, { id }, { token }) => {

                try {

                    if (token) {

                        const { email } = JWT.verifyToken(token);

                        const user = await User.findOne({ email });

                        if (user) {
                            const length = user.notifications.length;
                            user.notifications = user.notifications.filter(notif => !notif.travelId.equals(id));
    
                            if (length === user.notifications.length) throw new Error(`User ${email} doesn't have notification with id ${id}`);
    
                            await user.save();
                            return user;
                        } else {
                            throw new Error(`User with email ${email} doesn't exist`);
                        }
                    } else {
                        throw new Error('Unauthorized');
                    }       
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
        }
    }
});

module.exports = RootMutationType;