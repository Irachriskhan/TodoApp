"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAPIError = exports.createCustomError = void 0;
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomAPIError = CustomAPIError;
const createCustomError = (message, statusCode) => {
    console.log(message);
    return new CustomAPIError(message, statusCode);
};
exports.createCustomError = createCustomError;
//# sourceMappingURL=custom-errors.js.map