"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_errors_1 = require("../errors/custom-errors");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof custom_errors_1.CustomAPIError) {
        console.log('CustAPIError', err);
        return res.status(err.statusCode).json({ msg: err.message });
    }
    console.log(err);
    return res.status(500).json({ msg: `Something went wrong. Please try again later` });
};
exports.default = errorHandlerMiddleware;
//# sourceMappingURL=error-handler.js.map