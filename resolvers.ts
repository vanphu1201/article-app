import Article from "./models/article.model";

export const resolvers = {
    Query: {
        hello: () => {
            return "hello world!";
        },
        getListArticle: async () => {
            const articles = await Article.find({
                deleted: false
            });
            return articles
        }
    }
}