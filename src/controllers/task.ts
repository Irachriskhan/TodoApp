import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";
import asyncWrapper from "../middleware/async";
import { createCustomError } from "../errors/custom-errors";

const getAllTask = asyncWrapper(async (req: Request, res: Response) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const getTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id = ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id = ${taskID}`, 404));
  }
  res.status(200).json({ _id: taskID, data: req.body });
});

const editTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id = ${taskID}`, 404));
  }
  res.status(200).json({ _id: taskID, data: req.body });
});

const deleteTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id = ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

export {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
