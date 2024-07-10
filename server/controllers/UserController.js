import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import validateEmail from "../config/validateEmail.js";
import validatePassword from "../config/validatePassword.js";
import jwt from "jsonwebtoken";

class UserController {
    static userRegister = async (req, res) => {
        const { name, email, password } = req.body;

        if (!name) {
            return res.status(400).json({ msg: "Enter your name" });
        }
        if (!email) {
            return res.status(400).json({ msg: "Enter your email" });
        }
        if (!password) {
            return res.status(400).json({
                msg: "Enter your password in the following format: At least 8 characters long, contains at least one uppercase letter, contains at least one lowercase letter, contains at least one number, and contains at least one special character"
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ msg: "Enter a valid email" });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ msg: "Enter a valid password" });
        }

        try {
            const exists = await User.findOne({ email });

            if (exists) {
                return res.status(409).json({ msg: "Email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                name,
                email,
                password: hashPassword
            });

            await newUser.save();

            const token = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN, { expiresIn: "5d" });

            return res.status(201).json({
                msg: "User created successfully",
                token
            });

        } catch (error) {
            console.error("Error registering user:", error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    static userLogin = async (req, res) => {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ msg: "Enter your email" });
        }
        if (!password) {
            return res.status(400).json({ msg: "Enter your password" });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ msg: "Enter a valid email" });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ msg: "Enter a valid password" });
        }

        try {
            const loggedUser = await User.findOne({ email });

            if (!loggedUser) {
                return res.status(404).json({ msg: "No user found" });
            }

            const comparePassword = await bcrypt.compare(password, loggedUser.password);

            if (!comparePassword) {
                return res.status(401).json({ msg: "Wrong credentials" });
            }

            const token = jwt.sign({ userId: loggedUser._id }, process.env.ACCESS_TOKEN, { expiresIn: '5d' });

            return res.status(200).json({
                msg: "User logged in successfully",
                token
            });

        } catch (error) {
            console.error("Error logging in user:", error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    static userInfo = (req, res) => {
        return res.status(200).json({ user: req.user });
    }
}

export default UserController;
