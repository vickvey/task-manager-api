import { User } from "../models/User";
import { Task } from "../models/Task"
import ApiError from "../utils/ApiError";

export async function createTask(userId, title, description, status, priority, dueDate) {
  const existingUser = await User.findById(userId);
  if (!existingUser) throw new ApiError(400, "User doesn't exist");

  const newTask = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    userId,
  })

  return newTask;
}

export async function getTaskById(userId, taskId) {
  const existingUser = await User.findById(userId);
  if (!existingUser) throw new ApiError(400, "User doesn't exist");

  const existingTask = await Task.findById(taskId);
  if (!existingTask) throw new ApiError(400, "Task doesn't exist");

  return existingTask;
}

/// TODO: Complete this module
