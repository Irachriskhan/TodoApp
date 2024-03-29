class CustomAPIError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (message: string, statusCode: number) => {
  console.log(message)
  return new CustomAPIError(message, statusCode);
};

export { createCustomError, CustomAPIError };
