require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const studyTimerRouter = require("./routes/studyTimerRouter");
const todoRouter = require("./routes/todoRouter");
const helmet = require("helmet");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());
app.use(helmet());
//routes
app.use("/user", userRouter);
app.use("/api/studyTimer", studyTimerRouter);
app.use("/api/todo", todoRouter);
//connect to MongoDB
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
