const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const port = 3001;

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);

const mongoose = require("mongoose");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect(
  "mongodb+srv://S_das:Sudipto123@cluster0.c1sttyl.mongodb.net/",
  { dbName: "job_board" }
);
