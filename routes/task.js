const express = require("express");
const router = express.Router();
const {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");
const { verifyUser } = require("../utils/verifyToken.js");

router.route("/").get(verifyUser, getAllTask).post(verifyUser, createTask);
router
  .route("/:id")
  .get(verifyUser, getTask)
  .patch(verifyUser, updateTask)
  .delete(verifyUser, deleteTask);

module.exports = router;
