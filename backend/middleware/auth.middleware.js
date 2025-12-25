const jwt = require("jsonwebtoken")
const authMiddleware = async (req, res, next) => {
    try {
        const header =  req.headers.authorization;
        if (!header) {
            return res.status(401).json({
                message: "token required "
            })
        }
        const token = header.split(" ")[1];
        // verify token 
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        //  decoded user data ko req.user me store karna
        req.user = decode;
        console.log(req.user)
        console.log("DECODED TOKEN:", decode);

        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports=authMiddleware