const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experience: {
        type: String,
        require: true
    },
    company: { type: String },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who posted
    applicants: [
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected"],
      default: "applied"
    }
  }
]

}, { timestamps: true })

module.exports=mongoose.model("Job",jobSchema)