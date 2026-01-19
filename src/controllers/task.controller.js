import * as taskService from "../services/task.service.js";
import apiResponse from "../utils/apiResponse.js";

export async function getAll(req, res, next) {
  try {
    const tasks = await taskService.getUserTasks(req.user.id);
    res.status(200).json(
      apiResponse(true, "Tasks fetched successfully", tasks)
    );
  } catch (error) {
    next(error);
  }
}

export async function getOne(req, res, next) {
  try {
    const task = await taskService.getTaskById(
      req.user.id,
      req.params.id
    );

    res.status(200).json(
      apiResponse(true, "Task fetched successfully", task)
    );
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const task = await taskService.createTask(
      req.user.id,
      req.body.title,
      req.body.description,
      req.body.status,
      req.body.priority,
      req.body.dueDate
    );

    res.status(201).json(
      apiResponse(true, "Task created successfully", task)
    );
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const task = await taskService.updateTask(
      req.user.id,
      req.params.id,
      req.body
    );

    res.status(200).json(
      apiResponse(true, "Task updated successfully", task)
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(req, res, next) {
  try {
    await taskService.deleteTask(req.user.id, req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
