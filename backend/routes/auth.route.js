const express=require("express")
const router=express.Router()
const authMiddleware=require("../middleware/auth.middleware")
const roleMiddleware=require("../middleware/role.middleware")
const {signup, login}=require("../controllers/auth.controller")
const { createJob, updateJob, deleteJob, viewAllJobs, getJobApplicants, updatejobStatus } = require("../controllers/recruiter.controller")
const candidateOnly = require("../middleware/candidate.middleware")
const {applyJobs, getAppliedJobs, withdrawApplication} = require("../controllers/candidate.controller")
router.post("/signup",signup)
router.post("/login",login)

router.post("/createJob",authMiddleware,roleMiddleware,createJob)
// router.put("/updateJob/:id",authMiddleware,roleMiddleware,updateJob)
// router.delete("/deleteJob/:id",authMiddleware,roleMiddleware,deleteJob)
// router.get("/viewallJobs",authMiddleware,viewAllJobs)
// // router.get("/viewallJobs",viewAllJobs)
router.post("/createJob",createJob)
router.put("/updateJob/:id",updateJob)
router.delete("/deleteJob/:id",deleteJob)
router.get("/viewallJobs",viewAllJobs)


// candidate can only apply for jobs not recruiter
// router.post("/apply/:jobId",authMiddleware,candidateOnly,applyJobs) 
// router.get("/appliedjobs",authMiddleware,candidateOnly,getAppliedJobs)
// router.delete("/withdraw/:jobId",authMiddleware,candidateOnly,withdrawApplication);

router.post("/apply/:jobId",applyJobs) 
router.get("/appliedjobs",getAppliedJobs)
router.delete("/withdraw/:jobId",withdrawApplication);

// RECRUITER:View applicants of a job 
// router.get("/job/:jobId/applicants",authMiddleware,roleMiddleware,getJobApplicants)
// router.put("/updateStatus/:jobId/:candidateId",updatejobStatus)

router.get("/job/:jobId/applicants",getJobApplicants)
router.put("/updateStatus/:jobId/:candidateId",updatejobStatus)





module.exports=router