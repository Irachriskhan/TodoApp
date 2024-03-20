const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const task = require("./routes/task");
const dbConnection = require("./db/connect");
require("dotenv").config(); // npm install dotenv
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// json middleware
app.use(express.json());
app.use(express.static("./public"));

// routes
app.use("/api/v1/task", task);

app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`"Task Manager App running on port ${port}!"`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
