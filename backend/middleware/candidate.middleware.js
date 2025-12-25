const candidateOnly=async(req,res,next)=>{
    try {
        if(!req.user || req.user.role!="candidate"){
        return res.status(400).json({
            message:"recruiter can not apply for jobs "
        })
    }
    next()
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports=candidateOnly