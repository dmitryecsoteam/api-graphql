const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql

const OriginType = new GraphQLObjectType({
    name: 'Origin',
    fields: () => ({
        _id: { type: GraphQLInt },
        name: { type: GraphQLString },
        iata: { type: GraphQLString },
        country: { type: GraphQLString }
    })
})

module.exports = OriginType