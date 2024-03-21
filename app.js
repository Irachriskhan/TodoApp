const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
require("dotenv").config();

const task = require("./routes/task");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");

// db connection
const dbConnection = require("./db/connect");

// error handlers
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// extra security packages
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");

// Testing GET method
app.get("/", (req, res) => {
  res.send('<h1>TODO API</h1><a href="/api-docs">Documentation</a>');
});

// middleware
app.use(express.json());
app.use(express.static("./public"));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/task", task);
app.use(notFound);
app.use(errorHandlerMiddleware);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
  })
);

const start = async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`"Todo App running on port ${port}!"`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
