const express=require("express")
const router = express.Router();

const { recommendJobs } =require("../controllers/ai.controller.js");
router.get("/test", (req, res) => {
  res.send("AI route working");
});


router.post("/recommend-jobs", recommendJobs);

 module.exports= router;