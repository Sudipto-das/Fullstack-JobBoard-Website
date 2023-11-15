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
  
  // Find all applications for the user
  const applications = await Application.find({ user: userId }).populate("job");

  if (applications.length > 0) {
    // Extract job details from each application
    const appliedJobs = applications.map(application => ({
      job: application.job,
      status: application.status
    }));

    res.json({ appliedJobs });
  } else {
    res.json({ message: "No applied jobs found for the user" });
  }
});

router.get("/applications", authenticatejwt, async (req, res) => {
  const userId = req.user.id;
  const appliedJob = await Application.find({ admin: userId });
  if (appliedJob.length >0) {
    const applications = appliedJob.map(application=>({
      id:application._id,
      coverLetter:application.coverLetter,
      resume:application.resume
    }))
    res.json({ applications });
  }  
  else{
    res.json({ message: "No application found " });
  }
});
router.get('/download/resume/:applicationId',async (req,res)=>{
  const applicationId = req.params.applicationId
  try{
    const application = await Application.findById(applicationId)

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.setHeader('Content-Type', application.resume.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="resume.pdf"`);

    res.send(application.resume.data);

  }
  catch(error){
    res.status(500).json({ message: 'Error downloading resume' });
  }
})
router.get('/posted',authenticatejwt, async (req,res)=>{
  const userId = req.user.id
  
  try{
    const postedJobs = await Job.find({admin:userId})

    if(!postedJobs){
      res.status(404).json({message:'Not any Job Posted '})
    }
    res.json({postedJobs})
  }
  catch(error){

  }
})

module.exports = router;
