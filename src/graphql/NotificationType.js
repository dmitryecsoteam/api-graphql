const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: {
        travelId: { type: GraphQLString },
        date: { type: GraphQLString },
        priceAirplaneLast: { type: GraphQLInt },
        priceHotelLast: { type: GraphQLInt }
    }
});

module.exports = NotificationType;