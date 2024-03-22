"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const verifyToken_1 = require("../utils/verifyToken");
// update User
router.put("/:id", verifyToken_1.verifyUser, userController_1.updateUser);
// delete User
router.delete("/:id", verifyToken_1.verifyAdmin, userController_1.deleteUser);
// get single User
router.get("/:id", verifyToken_1.verifyUser, userController_1.getSingleUser);
// get all Users
router.get("/", verifyToken_1.verifyAdmin, userController_1.getAllUser);
exports.default = router;
//# sourceMappingURL=users.js.map