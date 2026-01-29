import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
    Query: {
        getListArticle: async (_, args) => {
            let find = {
                deleted: false
            };

            let sort = {}
            const { sortKey, sortValue } = args;

            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }

            const articles = await Article.find(find).sort(sort);
            return articles;
        },
        getArticle: async (_, args) => {
             const { id } = args;
            const article = await Article.findOne({
                _id: id,
                deleted: false
            });
            return article;
        },
    },

    Article: {
        category: async (article) => {
            const categoryId = article.categoryId;
            const category = await Category.findOne({_id: categoryId, deleted: false});
            return category;
        }
    },

    Mutation: {
        createArticle: async (_, args) => {
            const {article} = args;
            const record = new Article(article);
            await record.save();
            return record;
        },
        deleteArticle: async (_, args) => {
            const { id } = args;
            await Article.updateOne({
                _id: id
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            return "Da xoa";
        },
        updateArticle: async (_, args) => {
            const { id, article } = args;

            await Article.updateOne({_id: id }, article);

            const record = await Article.findOne({_id: id});

            return record;
        },
    }
}