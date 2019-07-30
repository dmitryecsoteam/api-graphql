const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = graphql;
const JWT = require('../auth/JWT');

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
        }
    }
});

module.exports = RootQueryType;