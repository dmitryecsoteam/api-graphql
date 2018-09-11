const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const OriginType = new GraphQLObjectType({
    name: 'Origin',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        iata: { type: GraphQLString },
        country: { type: GraphQLString }
    })
})

module.exports = OriginType