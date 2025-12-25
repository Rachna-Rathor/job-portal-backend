const Job = require("../models/job.models")

const applyJobs = async (req, res) => {
 try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check duplicate apply
    const alreadyApplied = job.applicants.some(
      (app) => app.candidate && app.candidate.toString() === req.user.id.toString()
    );
    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: "Already applied" });
    }

    job.applicants.push({ candidate: req.user.id });

    await job.save();

    res.status(200).json({ success: true, message: "Applied successfully" });
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
const mongoose = require("mongoose");

const getAppliedJobs = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); 
    const jobs = await Job.find({"applicants.candidate": userId });
    console.log("TOKEN USER ID:", req.user.id);


    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const withdrawApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    if (!job.applicants || !Array.isArray(job.applicants) || job.applicants.length === 0) {
      return res.status(400).json({ success: false, message: "You have not applied for this job" });
    }

    // finding applicant by candidate ID
    const applicantIndex = job.applicants.findIndex(app => 
      app.candidate && app.candidate.toString() === userId.toString()
    );

    if(applicantIndex===-1){
      return res.status(400).json({
        success: false, 
        message: "You have not applied for this job"
      })
    }
        // Remove user from applicants
      job.applicants.splice(applicantIndex,1)
    await job.save();

    res.status(200).json({
      success: true,
      message: "Application withdrawn successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  applyJobs,
  getAppliedJobs,
  withdrawApplication,
}