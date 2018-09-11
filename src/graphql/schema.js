const graphql = require('graphql')
const OriginType = require('./OriginType')
const DestinationType = require('./DestinationType')
const TravelType = require('./TravelType')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql
const Origin = require('./../models/Origin')
const Destination = require('./../models/Destination')
const Travel = require('./../models/Travel')

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        originStartsWith: {
            type: new GraphQLList(OriginType),
//            type: OriginType,
            args: { name: { type: GraphQLString }},
            resolve: async (parent, args) => {
                return await Origin.find({ name: {'$regex': '^'+args.name} })
            }
        },
        destinationStartsWith: {
            type: new GraphQLList(DestinationType),
            args: { name: { type: GraphQLString }},
            resolve: async (parent, args) => {
                return await Destination.find({ name: {'$regex': '^'+args.name} })
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
                for (var property in args) {
                    if (args.hasOwnProperty(property)) {
                        args[property] = { $gte: args[property] }
                    }
                }
                return await Destination.find(args)
            }
        },
        destination: {
            type: DestinationType,
            args: { _id: { type: GraphQLString }},
            resolve: async (parent, args) => {
                return await Destination.findById(args._id)
            }
        },
        travel: {
            type: TravelType,
            args: { 
                origin: { type: GraphQLString },
                destination: { type: GraphQLString },
                date: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                return await Travel.findOne(args)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})