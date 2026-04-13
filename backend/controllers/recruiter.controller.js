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
        const { title, location, salary, page = 1, limit = 10, type } = req.query;
        const makingQuery = {};
        if (title) {
            makingQuery.title = title
        }
        if (location) {
            makingQuery.location = location
        }
        if (salary) {
            makingQuery.salary = salary
        }
        if (type) {
            makingQuery.type = type;
        }
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber
        const jobs = await Job.find(makingQuery).skip(skip).limit(limitNumber).sort({ createdAt: -1 });

        const totalJobs = await Job.countDocuments(makingQuery)
        res.status(200).json({
            totalJobs,
            currentPage: pageNumber,
            limitNumber: Math.ceil(totalJobs / limitNumber),
            jobs
        })
    } catch (error) {
        console.log(error.message)
    }
};

const getJobApplicants = async (req, res) => {
    try {


        const job = await Job.findById(
             req.params.jobId

        )
            .populate("applicants.candidate", "name email");
            console.log(req.user)
             console.log(job)


        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found "
            });
        }
        if (job.recruiter.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        return res.status(200).json({
            success: true,
            jobTitle: job.title,
            applicants: job.applicants
        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updatejobStatus = async (req, res) => {
    try {
        const { jobId, candidateId } = req.params;
        const { status } = req.body;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "job not found"
            })
        }
        console.log("candidateId from params:", candidateId);
        console.log("applicants array:", job.applicants);
        const candidate = job.applicants.find((app) => {
            console.log("DB candidate:", app.candidate.toString());
            return app.candidate.toString() === candidateId
        })

        if (!candidate) {
            return res.status(404).json({
                message: "candidate not found"
            })
        }
        candidate.status = status;
        await job.save()
        res.status(200).json({
            message: "Status updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    viewAllJobs,
    getJobApplicants,
    updatejobStatus,
}