import express, { Router } from "express";
import {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task";
import { verifyUser } from "../utils/verifyToken";

const router: Router = express.Router();

router.route("/")
  .get(verifyUser, getAllTask)
  .post(verifyUser, createTask);

router.route("/:id")
  .get(verifyUser, getTask)
  .patch(verifyUser, updateTask)
  .delete(verifyUser, deleteTask);

export default router;
