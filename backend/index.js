const express =require("express")
const app=express()
require("dotenv").config(); 
app.use(express.json());
const connectDB=require("./config/db")
const authrouter=require("./routes/auth.route")
const aiRoutes=require("./routes/ai.routes")
const aiResumeAnalysis=require("./routes/resume.routes")
// app.use("/",(req,res)=>{
//     res.send("app is running");
// })
app.use("/api",authrouter)
app.use("/api/ai",aiRoutes)
app.use("/api/ai",aiResumeAnalysis)

app.listen(4000,()=>{
    console.log("app listen on 4000 port")
})
connectDB()
