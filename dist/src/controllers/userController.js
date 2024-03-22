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
exports.createUser = exports.updateUser = exports.getAllUser = exports.getSingleUser = exports.deleteUser = void 0;
const User_1 = __importDefault(require("../models/User"));
// create new User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User_1.default(req.body);
    try {
        const savedUser = yield newUser.save();
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedUser,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again",
        });
    }
});
exports.createUser = createUser;
// update User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "failed to update" });
    }
});
exports.updateUser = updateUser;
// delete User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield User_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "failed to deleted" });
    }
});
exports.deleteUser = deleteUser;
// getSingle User
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield User_1.default.findById(id);
        res.status(200).json({
            success: true,
            message: "Successful",
            data: user,
        });
    }
    catch (err) {
        res.status(404).json({ success: false, message: "not found" });
    }
});
exports.getSingleUser = getSingleUser;
// getAll User
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        res.status(200).json({
            success: true,
            message: "Successful",
            data: users,
        });
    }
    catch (err) {
        res.status(404).json({ success: false, message: "not found" });
    }
});
exports.getAllUser = getAllUser;
//# sourceMappingURL=userController.js.map