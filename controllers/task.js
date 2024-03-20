const Task = require("../models/Task");

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.send("Error: No task found").status(404);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    console.log(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return next(createCustomError(`No task with id = ${taskID}`, 404));
    }
    res.status(200).json({ task });
  } catch (error) {
    res.send("No task found").status(404);
  }
  // res.send("This is the task").status(200);
};

//  PATCH method
const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.send(`No task with id = ${taskID}`).status(404);
    }
    res.status(200).json({ _id: taskID, data: req.body });
  } catch (error) {
    res.send("No Task updated").status(404);
  }
};

// PUT method

const editTask = async (req, res) => {
  res.send("Task is updated").status(200);
};

// DELETE method
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      res.send(`No task with id = ${taskID}`).status(404);
    }
    res.status(200).json({ task });
  } catch (error) {
    res.send("No Task deleted").status(404);
  }
};

module.exports = {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
