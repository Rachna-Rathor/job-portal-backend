const express=require("express")
const router=express.Router()
const upload=require("../middleware/resume.upload")
const {resumeAnalysis}=require("../controllers/resume.controller")
console.log("Resume routes loaded");
router.post("/resumeanalyze",upload.single("resume"),resumeAnalysis)

module.exports=router;