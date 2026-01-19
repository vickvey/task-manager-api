import { Task } from "../models/Task.js";
import ApiError from "../utils/ApiError.js";

export async function create(userId, data) {
  return await Task.create({ ...data, userId });
}

export async function getById(userId, taskId) {
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) throw new ApiError(404, "Task not found");
  return task;
}

export async function getAll(userId, filters = {}) {
  return await Task.find({ userId, ...filters }).sort({ createdAt: -1 });
}

export async function updateById(userId, taskId, updateData) {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!task) throw new ApiError(404, "Task not found");
  return task;
}

export async function removeById(userId, taskId) {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) throw new ApiError(404, "Task not found");
  return task;
}
