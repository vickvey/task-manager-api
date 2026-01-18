import mongoose from "mongoose";

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

export { Task };
