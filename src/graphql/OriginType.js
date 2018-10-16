const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const OriginType = new GraphQLObjectType({
    name: 'Origin',
    fields: () => ({
        _id: { type: GraphQLInt },
        name: { type: new GraphQLList(GraphQLString) },
        name_en: { type: GraphQLString },
        iata: { type: GraphQLString },
        country_en: { type: GraphQLString }
    })
});

module.exports = OriginType;