// @ts-check
import mongoose from "mongoose";

/**
 * @typedef {Object} TaskDocument
 * @property {string} title
 * @property {string} [description] // Optional
 * @property {"todo" | "in-progress" | "done"} status
 * @property {"low" | "medium" | "high"} [priority]
 * @property {Date} [dueDate] // Optional
 * @property {mongoose.Types.ObjectId} userId
 * @property {mongoose.Types.ObjectId[]} [categories] // Optional
 * @property {Date} [createdAt] // Optional
 * @property {Date} [updatedAt] // Optional
 * @property {mongoose.Types.ObjectId} [_id]
 */

/** @type {mongoose.Schema<TaskDocument>} */
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
  },
  dueDate: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }],
}, {
  timestamps: true
});

// Indexes
taskSchema.index({ userId: 1 });
taskSchema.index({ userId: 1, status: 1 });
// TODO: Advanced Stuff
// taskSchema.index({ title: 'text', description: 'text' }, {
//   weights: { title: 5, description: 1 },
//   name: "TextIndex"
// });

const Task = mongoose.model('Task', taskSchema);

export {Task};
