import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const createdUser = await User.create({
            fullname,
            email,
            password: hashedPassword
        })

        res.status(200).json({
            message: "User created successfully", user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email
            }
        })

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal Server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // compare(req.body, hashed password stored in database)
        const isMatch = await bcryptjs.compare(password, user.password)

        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        } else {
            res.status(200).json({
                message: "Login successfull",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email
                }
            })
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}