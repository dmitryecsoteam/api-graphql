const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
const DestinationType = require('./DestinationType');
const Destination = require('./../models/Destination');

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