const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;
const NotificationType = require('./NotificationType');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        notifications: { type: new GraphQLList(NotificationType) }
    }
});

module.exports = UserType;