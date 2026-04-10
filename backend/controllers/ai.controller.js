const Job =require("../models/job.models.js");
const { getJobRecommendations }=require("../services/ai.service.js");

const recommendJobs = async (req, res) => {
  try {
    const { skills } = req.body;
    console.log("Skills:", req.body.skills);

    //jobs from DB
    const jobs = await Job.find().limit(20);
    console.log("Jobs count:", jobs.length);

    const recommendations = await getJobRecommendations(skills, jobs);

    res.json({
      success: true,
      data: recommendations,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { recommendJobs };