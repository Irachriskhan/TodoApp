const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const task = require("./routes/task");
const dbConnection = require("./db/connect");
require("dotenv").config();

// json middleware
app.use(express.json());

// routes
app.use("/api/v1/task", task);

const start = async () => {
  try {
    await dbConnection(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Todo App running on port ${port}!`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
