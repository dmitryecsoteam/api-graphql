const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const DestinationType = new GraphQLObjectType({
    name: 'Destiantion',
    fields: () => ({
        _id: { type: GraphQLInt },
        name: { type: new GraphQLList(GraphQLString) },
        iata: { type: GraphQLString },
        name_en: { type: GraphQLString },
        country_en: { type: GraphQLString },
        museumRating: { type: GraphQLInt },
        museumDescription: { type: GraphQLString },
        zooAquaRating: { type: GraphQLInt },
        zooAquaDescription: { type: GraphQLString },
        wellnessSpaRating: { type: GraphQLInt },
        wellnessSpaDescription: { type: GraphQLString },
        mountainsRating: { type: GraphQLInt },
        mountainsDescription: { type: GraphQLString },
        beachRating: { type: GraphQLInt },
        beachDescription: { type: GraphQLString },
        foodRating: { type: GraphQLInt },
        foodDescription: { type: GraphQLString },
        shoppingRating: { type: GraphQLInt },
        shoppingDescription: { type: GraphQLString },
        historicalRating: { type: GraphQLInt },
        historicalDescription: { type: GraphQLString },
        natureRating: { type: GraphQLInt },
        natureDescription: { type: GraphQLString }
    })
});

module.exports = DestinationType;