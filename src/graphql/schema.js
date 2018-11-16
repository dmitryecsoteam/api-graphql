const graphql = require('graphql');
const mongoose = require('mongoose');
const OriginType = require('./OriginType');
const DestinationType = require('./DestinationType');
const TravelType = require('./TravelType');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;
const Origin = require('./../models/Origin');
const Destination = require('./../models/Destination');
const Travel = require('./../models/Travel');

const ObjectId = (_id) => {
    return `ObjectId("${_id}")`;
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        originStartsWith: {
            type: new GraphQLList(OriginType),
//            type: OriginType,
            args: { name: { type: GraphQLString }},
            resolve: async (parent, args) => {
                return await Origin.find({ name: {'$regex': '^'+args.name, $options: '-i'} });
            }
        },
        destinationStartsWith: {
            type: new GraphQLList(DestinationType),
            args: { name: { type: GraphQLString }},
            resolve: async (parent, args) => {
                return await Destination.find({ name: {'$regex': '^'+args.name, $options: '-i'} });
            }
        },
        destinationRating: {
            type: new GraphQLList(DestinationType),
            args: {
                museumRating: { type: GraphQLInt },
                zooAquaRating: { type: GraphQLInt },
                wellnessSpaRating: { type: GraphQLInt },
                mountainsRating: { type: GraphQLInt },
                beachRating: { type: GraphQLInt },
                foodRating: { type: GraphQLInt },
                shoppingRating: { type: GraphQLInt },
                historicalRating: { type: GraphQLInt },
                natureRating: { type: GraphQLInt }
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
            args: { _id: { type: GraphQLInt }},
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
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});