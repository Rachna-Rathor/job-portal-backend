const Job = require("../models/job.models")


const createJob = async (req, res) => {
    try {
        const { title, description, location, salary, experience, company } = req.body;
        if (!title || !description || !company || !location || !experience || !salary) {
            return res.status(400).json({
                message: " all fields required title,description,location,salary,experience,company"
            })
        }
        const job = await Job.create({
            title,
            description,
            location,
            salary,
            experience,
            company,
            recruiter: req.user.id, // recruiter id from JWT

        })
        res.status(201).json({
            message: "Job created successfully ✅",
            job,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const findJob = await Job.findById(jobId)
        if (!findJob) {
            return res.status(400).json({
                message: "job not found"
            })
        }
        if (findJob.recruiter.toString() !== req.user.id) {
            console.log(findJob.recruiter.toString() !== req.user.id)
            return res.status(403).json({
                message: "You can update only your own job"
            });
        }
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            req.body,
        )
        res.status(200).json({
            message: "Job updated successfully ✅",
            job: updatedJob
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const findJob = await Job.findById(jobId)
        if (!findJob) {
            return res.status(400).json({
                message: "job not found"
            })
        }
        const deletedJob = await Job.findByIdAndDelete(jobId)
        res.status(200).json({
            message: "Job Deleted Successfully",
            deletedJob

        })
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}
const viewAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("recruiter", "name email");

        res.status(200).json({
            success: true,
            totalJobs: jobs.length,
            jobs
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getJobApplicants = async (req, res) => {
     try {
    const job = await Job.findOne({ _id: req.params.jobId, recruiter: req.user.id })
      .populate("applicants.candidate", "name email"); // ✅ populate properly

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      jobTitle: job.title,
      applicants: job.applicants
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    viewAllJobs,
    getJobApplicants,
}