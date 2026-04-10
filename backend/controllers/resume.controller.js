const pdfParse=require("pdf-parse")
const {getJobRecommendationsAI}=require("../services/ai.service")
const {extractSkillsFromText}=require("../services/ai.service")
const job=require("../models/job.models")


const resumeAnalysis= async (req,res)=>{
 try {
    const file=req.file;
    if(!file){
        return res.status(400).json({message:"file not uploaded"})
    }
    const data=await pdfParse(file.buffer)
    const resumeText=data.text;
    console.log("Resume Text:", resumeText);
    const skills = await extractSkillsFromText(resumeText)
    const jobs= await job.find().limit(10).lean();
    const recommendations = await getJobRecommendationsAI(skills, jobs,resumeText);

    res.json({
        success:true,
        skills,
        recommendations
    })
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
    
 }
}
module.exports={
    resumeAnalysis
}