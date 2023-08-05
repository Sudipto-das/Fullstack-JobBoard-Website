const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isUser: Boolean,
  username: String,
  password: String,
});

const adminSchema = new mongoose.Schema({
  isAdmin: Boolean,
  username: String,
  password: String,
});

const jobSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  catagory: String,
  lastdate: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const applicationSchema = new mongoose.Schema({
  job: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  resume: String,
  coverLetter: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Job = mongoose.model("Job", jobSchema);
const Application = mongoose.model("Application", applicationSchema);

module.exports = {
  User,
  Admin,
  Job,
  Application,
};
