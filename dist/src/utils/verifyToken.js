"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.verifyUser = exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "You're not authorized" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res
                .status(401)
                .json({ success: false, message: "token is invalid" });
        }
        // Assuming `user` contains the decoded token
        req.user = user;
        next(); // don't forget to call next
    });
};
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === "admin") {
            next();
        }
        else {
            return res
                .status(401)
                .json({ success: false, message: "You're not authenticated" });
        }
    });
};
exports.verifyUser = verifyUser;
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        }
        else {
            return res
                .status(401)
                .json({ success: false, message: "You're not authorized" });
        }
    });
};
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=verifyToken.js.map