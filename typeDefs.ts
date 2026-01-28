export const typeDefs = `#graphql
    type Articles {
        id: ID,
        title: String,
        avatar: String,
        description: String
    }

    type Query {
        hello: String,
        getListArticle: [Articles]
    }
`;