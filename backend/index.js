const express =require("express")
const app=express()
require("dotenv").config(); 
app.use(express.json());
const connectDB=require("./config/db")
const authrouter=require("./routes/auth.route")
// app.use("/",(req,res)=>{
//     res.send("app is running");
// })
app.use("/api",authrouter)

app.listen(4000,()=>{
    console.log("app listen on 4000 port")
})
connectDB()
