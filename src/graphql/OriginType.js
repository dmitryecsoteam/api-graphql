const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const OriginType = new GraphQLObjectType({
    name: 'Origin',
    fields: () => ({
        _id: { type: GraphQLInt },
        name: { type: new GraphQLList(GraphQLString) },
        nameEn: { type: GraphQLString },
        iata: { type: GraphQLString },
        countryEn: { type: GraphQLString }
    })
});

module.exports = OriginType;