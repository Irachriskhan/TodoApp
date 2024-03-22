"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getAllTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const async_1 = __importDefault(require("../middleware/async"));
const custom_errors_1 = require("../errors/custom-errors");
const getAllTask = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_1.default.find({});
    res.status(200).json({ tasks });
}));
exports.getAllTask = getAllTask;
const createTask = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_1.default.create(req.body);
    res.status(201).json(task);
}));
exports.createTask = createTask;
const getTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskID } = req.params;
    const task = yield Task_1.default.findOne({ _id: taskID });
    if (!task) {
        return next((0, custom_errors_1.createCustomError)(`No task with id = ${taskID}`, 404));
    }
    res.status(200).json({ task });
}));
exports.getTask = getTask;
const updateTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskID } = req.params;
    const task = yield Task_1.default.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next((0, custom_errors_1.createCustomError)(`No task with id = ${taskID}`, 404));
    }
    res.status(200).json({ _id: taskID, data: req.body });
}));
exports.updateTask = updateTask;
const editTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskID } = req.params;
    const task = yield Task_1.default.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
        overwrite: true,
    });
    if (!task) {
        return next((0, custom_errors_1.createCustomError)(`No task with id = ${taskID}`, 404));
    }
    res.status(200).json({ _id: taskID, data: req.body });
}));
const deleteTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskID } = req.params;
    const task = yield Task_1.default.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next((0, custom_errors_1.createCustomError)(`No task with id = ${taskID}`, 404));
    }
    res.status(200).json({ task });
}));
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.js.map