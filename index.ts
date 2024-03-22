import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import taskRouter from "./src/routes/task";
import userRouter from "./src/routes/users";
import authRouter from "./src/routes/auth";
import dbConnection from "./src/db/connect";
import notFoundMiddleware from "./src/middleware/not-found";
import errorHandlerMiddleware from "./src/middleware/error-handler";
import cors from "cors";
// import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Testing GET method
app.get("/", (req: Request, res: Response) => {
  res.send('<h1>TODO API</h1><a href="/api-docs">Documentation</a>');
});

// Middleware
app.use(express.json());
app.use(express.static("./public"));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
// app.use(xss());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  })
);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "default_mongo_uri"; // Provide a default value
    await dbConnection(mongoURI);
    app.listen(port, () => {
      console.log(`"Todo App running on port ${port}!"`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
