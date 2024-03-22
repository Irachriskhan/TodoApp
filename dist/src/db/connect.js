"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = (url) => {
    return mongoose_1.default
        .connect(url, {
        readPreference: "primary",
        // authMechanism: "SCRAM",
        // readPreferenceTags: { dc: "ny", rack: "r1" },
        retryWrites: true,
        retryReads: true,
    })
        .then(() => {
        console.log("Connected to the Database!");
    })
        .catch((err) => {
        console.error("Error connecting to the Database", err);
    });
};
exports.default = dbConnection;
//# sourceMappingURL=connect.js.map