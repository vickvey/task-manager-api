import mongoose from "mongoose";
import slugify from "slugify";

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
  slug: String,
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
taskSchema.index({ slug: 1, userId: 1 }, { unique: true });

// TODO: Advanced Stuff
// taskSchema.index({ title: 'text', description: 'text' }, {
//   weights: { title: 5, description: 1 },
//   name: "TextIndex"
// });

taskSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();

  this.slug = slugify(this.title, {
    lower: true,
    strict: true, // removes special characters
    trim: true
  })

})

const Task = mongoose.model('Task', taskSchema);

export { Task };
