const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
const DestinationType = require('./DestinationType');
const OriginType = require('./OriginType');
const Destination = require('./../models/Destination');
const Origin = require('./../models/Origin');

const TravelType = new GraphQLObjectType({
    name: 'Travel',
    fields: () => ({
        _id: { 
            type: GraphQLString,
            resolve: (root) => {
                return root._id.toString();
            }
        },
        destination: { //type: GraphQLString
            type: DestinationType,
            resolve: async (root) => {
                return await Destination.findById(root.destination);
            }
        },
        origin: {
            type: OriginType,
            resolve: async (root) => {
                return await Origin.findById(root.origin);
            }
        },
        date: { type: GraphQLString },
        priceAirplane: { type: GraphQLInt },
        priceHotel: { type: GraphQLInt },
        weatherTempStatMax: { type: GraphQLInt },
        weatherTempStatMin: { type: GraphQLInt },
        carDuration: { type: GraphQLInt },
        carDistance: { type: GraphQLInt }
    })
});

module.exports = TravelType;