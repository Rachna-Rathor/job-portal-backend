const User = require("../models/user.models")

const roleMiddleware = async (req, res, next) => {
    try {
        const user = req.user
        if (!user || user.role != "recruiter") {
            console.log(user)
            console.log(user.role)
            return res.status(401).json({
                message: "Access denied only recruiter"
            })
        }
        next()
    } catch (error) {
        res.status(500).json({ message: error.message });


    }


}

module.exports=roleMiddleware