const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const DestinationType = new GraphQLObjectType({
    name: 'Destiantion',
    fields: () => ({
        _id: { type: GraphQLInt },
        name: { type: new GraphQLList(GraphQLString) },
        cityDescription: { type: GraphQLString },
        population: { type: GraphQLString },
        iata: { type: GraphQLString },
        nameEn: { type: GraphQLString },
        countryEn: { type: GraphQLString },
        museumRating: { type: GraphQLInt },
        museumDescription: { type: GraphQLString },
        beachRating: { type: GraphQLInt },
        beachDescription: { type: GraphQLString },
        foodRating: { type: GraphQLInt },
        foodDescription: { type: GraphQLString },
        shoppingRating: { type: GraphQLInt },
        shoppingDescription: { type: GraphQLString },
        natureRating: { type: GraphQLInt },
        natureDescription: { type: GraphQLString },
        nightlifeRating: { type: GraphQLInt },
        nightlifeDescription: { type: GraphQLString }
    })
});

module.exports = DestinationType;