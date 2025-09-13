// @ts-check
import mongoose from "mongoose";

/**
 * @typedef {Object} CategoryDocument
 * @property {String} name
 * @property {mongoose.Types.ObjectId} userId
 * @property {Date} [createdAt] // Optional
 * @property {Date} [updatedAt] // Optional
 * @property {mongoose.Types.ObjectId} [_id] // Optional
 */

/** @type {mongoose.Schema<CategoryDocument>} */
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

// Compound unique index to prevent duplicate category names per user
categorySchema.index(
    { userId: 1, name: 1 }, 
    { unique: true });

const Category = mongoose.model("Category", categorySchema);

export {Category};