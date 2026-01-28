import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        title: String,
        avatar: String,
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", CategorySchema, "categories");

export default Category;