const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql

const DestinationType = new GraphQLObjectType({
    name: 'Destiantion',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        iata: { type: GraphQLString },
        country: { type: GraphQLString },
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
})

module.exports = DestinationType