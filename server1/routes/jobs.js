const { authenticatejwt } = require("../middleware/");
const express = require("express");
const { Job, Admin, Application } = require("../database");
const multer = require('multer')
const router = express.Router();

router.post("/create", authenticatejwt, async (req, res) => {
  const { title, description,type,catagory,company,lastdate,salary } = req.body;
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;
  console.log(userId);
  if (!isAdmin) {
    return res
      .status(403)
      .json({ message: "only admin users can create a job" });
  }
  const job = new Job({ title, description, admin: userId ,type,catagory,company,lastdate,salary});
  job.save().then((newJob) => {
    res.json({ massage: "job posted sucsessfully", newJob });
  });
});

router.get("/alljobs", authenticatejwt, async (req, res) => {
  const jobs = await Job.find({});
  res.json({ jobs });
});

router.put("/update/:jobId", authenticatejwt, async (req, res) => {
  const isAdmin = req.user.isAdmin;
  const { jobId } = req.params;
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!isAdmin) {
    return res.json({ massage: "only admin users can edit this" });
  }
  Job.findOneAndUpdate(
    { _id: jobId, admin: userId },
    { title, description },
    { new: true }
  ).then((updatedJob) => {
    if (!updatedJob) {
      return res.status(403).json({ massage: "Job not found" });
    }
    res.json({ updatedJob });
  });
});

router.post("/apply/:jobId", authenticatejwt, async (req, res) => {
  const isUser = req.user.isUser;
  const userId = req.user.id;
  const { jobId } = req.params;
  

  if (!isUser) {
    return res.status(403).json({ message: "Only candidates can apply" });
  }

  const job = await Job.findOne({ _id: jobId });
  const adminId = job.admin;

  // Handle file upload using multer
  const upload = multer().single("resume"); // Use the same field name as in the frontend

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload error" });
    }

    const application = new Application({
      resume: {
        data: req.file.buffer, // Assuming multer has stored the file in req.file.buffer
        contentType: req.file.mimetype,
      },
      coverLetter:req.body.coverLetter,
      user: userId,
      job: job,
      admin: adminId,
    });

    application.save().then((newApplication) => {
      res.json({ message: "Application Submitted", newApplication });
    });
  });
});


router.get("/applied", authenticatejwt, async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const appliedJob = await Application.findOne({ user: userId }).populate(
    "job"
  );
 
  if (appliedJob) {
    res.json({ appliedJob: appliedJob.job });
  } else {
    res.json({ message: "No applied job found for the user" });
  }
});
router.get("/applications", authenticatejwt, async (req, res) => {
  const userId = req.user.id;
  const appliedJob = await Application.findOne({ admin: userId });
  if (appliedJob) {
    res.json({ appliedJob });
  }
});

module.exports = router;
