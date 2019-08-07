const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = graphql;
const JWT = require('../auth/JWT');
const moment = require('moment');

const Origin = require('./../models/Origin');
const Destination = require('./../models/Destination');
const Travel = require('./../models/Travel');
const User = require('../models/User');

const OriginType = require('./OriginType');
const DestinationType = require('./DestinationType');
const TravelType = require('./TravelType');
const UserType = require('./UserType');
const NotificationType = require('./NotificationType');




const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        originStartsWith: {
            type: new GraphQLList(OriginType),
            //            type: OriginType,
            args: { name: { type: GraphQLString } },
            resolve: async (parent, args) => {
                return await Origin.find({ name: { '$regex': '^' + args.name, $options: '-i' } });
            }
        },
        destinationStartsWith: {
            type: new GraphQLList(DestinationType),
            args: { name: { type: GraphQLString } },
            resolve: async (parent, args) => {
                return await Destination.find({ name: { '$regex': '^' + args.name, $options: '-i' } });
            }
        },
        destinationRating: {
            type: new GraphQLList(DestinationType),
            args: {
                museumRating: { type: GraphQLInt },
                beachRating: { type: GraphQLInt },
                foodRating: { type: GraphQLInt },
                shoppingRating: { type: GraphQLInt },
                natureRating: { type: GraphQLInt },
                nightlifeRating: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                let newArgs = args;
                for (var property in newArgs) {
                    if (newArgs.hasOwnProperty(property)) {
                        newArgs[property] = { $gte: newArgs[property] };
                    }
                }
                return await Destination.find(newArgs);
            }
        },
        destination: {
            type: DestinationType,
            args: { _id: { type: GraphQLInt } },
            resolve: async (parent, args) => {
                return await Destination.findById(args._id);
            }
        },
        travel: {
            type: TravelType,
            args: {
                origin: { type: GraphQLInt },
                destination: { type: GraphQLInt },
                date: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                return await Travel.findOne(args);
            }
        },
        travelFull: {
            type: TravelType,
            args: {
                _id: { type: GraphQLString }
            },
            resolve: async (parent, { _id }) => {
                return await Travel.findById(_id);
            }
        },
        currentUser: {
            type: UserType,
            resolve: async (parent, args, { token }) => {

                if (!token) return null;

                const { email, name } = JWT.verifyToken(token);

                return { email, name };
            }
        },
        getNotifications: {
            type: new GraphQLList(NotificationType),
            resolve: async (parent, args, { token }) => {

                try {

                    if (!token) throw new Error('Unauthorized');

                    const { email } = JWT.verifyToken(token);

                    const user = await User.findOne({ email }).select({ 'notifications': 1, '_id': 0 });

                    return user['notifications'];

                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
        },
        getBestDeals: {
            type: new GraphQLList(TravelType),
            args: {
                limit: { type: GraphQLInt },
                months: { type: GraphQLInt }
            },
            resolve: async (parent, { limit, months }) => {

                const date = moment().add(months, 'M').format('YYYY-MM-DD');

                // get list of minimal prices by origins
                const minPrices = await Travel.findMinPrices(date);

                // array of travels IDs to return
                const travels = [];

                for (let i = 1; i <= limit; i++) {

                    // randomly select item to process
                    const item = minPrices[Math.floor(Math.random() * minPrices.length)];

                    const results = await Travel.find({ origin: item._id, priceAirplane: item.minAirplane, date: { $lt: date } });

                    if (results.length > 0) {

                        // iterate through results array in random order
                        const visited = [];
                        while (visited.length < results.length) {
                            
                            // find next index
                            let next;
                            while (!next) {
                                const rndNumber = Math.floor(Math.random() * results.length);
                                if (!visited.includes(rndNumber)) {
                                    next = rndNumber;
                                    visited.push(next);
                                    break;
                                }
                            }

                            // check if result is not in travels array, add it and leave loop
                            if (!travels.some(tr => tr._id.equals(results[next]._id))) {
                                travels.push(results[next]);
                                break;
                            }
                        }
                    }
                }

                return travels;

            }
        }
    }
});

module.exports = RootQueryType;