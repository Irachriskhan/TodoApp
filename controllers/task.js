const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-errors");

const getAllTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id = ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

// using PATCH method to update specific fields
const updateTask = asyncWrapper(async (req, res) => {
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

// using PUT method to update the task
const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  // overwrite propety will replace existing content by the new content
  if (!task) {
    return next(createCustomError(`No task with id = ${taskID}`, 404));
  }
  res.status(200).json({ _id: taskID, data: req.body });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id = ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
