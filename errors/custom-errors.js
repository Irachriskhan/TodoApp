class CustopmAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statysCode) => {
  return new CustopmAPIError(msg, statysCode);
};

module.exports = { createCustomError, CustopmAPIError };
