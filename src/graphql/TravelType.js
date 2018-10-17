const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = graphql;
const DestinationType = require('./DestinationType');
const Destination = require('./../models/Destination');

const TravelType = new GraphQLObjectType({
    name: 'Travel',
    fields: () => ({
        _id: { type: GraphQLString },
        destination: { //type: GraphQLString
            type: DestinationType,
            resolve: async (root) => {
                return await Destination.findById(root.destination)
            }
         },
        date: { type: GraphQLString },
        priceAirplane: { type: GraphQLInt }
        //weatherTempStat: { type: GraphQLFloat },
        //weatherConditionStat: { type: GraphQLString }
    })
});

module.exports = TravelType;