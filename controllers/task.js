const Task = require("../models/Task");

const getAllTask = async (req, res) => {
  try {
    res.send("All tasks are here").status(200);
  } catch (error) {}
};

const createTask = async (req, res) => {
  res.send("Task created").status(201);
};

const getTask = async (req, res, next) => {
  res.send("This is the task").status(200);
};

//  PATCH method
const updateTask = async (req, res) => {
  res.send("Task updated partially").status(200);
};

// PUT method

const editTask = async (req, res) => {
  res.send("Task is updated").status(200);
};

// DELETE method
const deleteTask = async (req, res) => {
  res.send("Task deleted").status(200);
};

module.exports = {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
