const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
const DestinationType = require('./DestinationType.js');
const OriginType = require('./OriginType');

const Origin = require('../models/Origin');
const Destination = require('../models/Destination');

const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: {
        travelId: { type: GraphQLString },
        origin:  { 
            type: OriginType,
            resolve: async (root) => {
                return await Origin.findById(root.origin);
            }
        },            
        destination: { 
            type: DestinationType,
            resolve: async (root) => {
                return await Destination.findById(root.destination);
            }
        },
        date: { type: GraphQLString },
        priceAirplaneLast: { type: GraphQLInt },
        priceHotelLast: { type: GraphQLInt }
    }
});

module.exports = NotificationType;