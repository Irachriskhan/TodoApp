"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = require("../controllers/task");
const verifyToken_1 = require("../utils/verifyToken");
const router = express_1.default.Router();
router.route("/")
    .get(verifyToken_1.verifyUser, task_1.getAllTask)
    .post(verifyToken_1.verifyUser, task_1.createTask);
router.route("/:id")
    .get(verifyToken_1.verifyUser, task_1.getTask)
    .patch(verifyToken_1.verifyUser, task_1.updateTask)
    .delete(verifyToken_1.verifyUser, task_1.deleteTask);
exports.default = router;
//# sourceMappingURL=task.js.map