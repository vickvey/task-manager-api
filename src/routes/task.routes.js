import { Router } from "express";
import * as TaskController from "../controllers/task.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js"

const router = Router()

// get all tasks by a user 
router.get('/', authenticate, TaskController.getAll);

// get a task by id
router.get('/:id', authenticate, TaskController.getOne);

// create a new task
router.post('/', authenticate, TaskController.create);

// update an existing task
router.patch('/:id', authenticate, TaskController.update);

// delete a task
router.delete('/:id', authenticate, TaskController.deleteOne);


export default router; // tasksRouter
