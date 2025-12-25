const User = require("../models/user.models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "you already signup"
            })
        }
        const hashpassword = await bcrypt.hash(password, 10);
        //  create new user
        const user = await User.create({
            name,
            email,
            password: hashpassword,

        })

        res.status(200).json({
            message: "user created successfully ",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
           
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const finduser = await User.findOne({ email })
        if (!finduser) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        const comparePassword = await bcrypt.compare(password, finduser.password)
        if (!comparePassword) {
            return res.status(400).json({
                message: "password incorrect"
            })
        }
        const token = jwt.sign({
            id: finduser._id,
            role:finduser.role,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"

            })

        res.status(200).json({
            message: "login successfully",
            token,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    signup,
    login,
}