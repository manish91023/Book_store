import { z } from "zod";
import bcrypt from "bcrypt"
import { User } from "../Models/user.model.js";
import {generateAdminToken} from "../utils/jwt.js"
import { Course } from "../Models/course.model.js";
import { Purchase } from "../Models/purchase.model.js";
import { Admin } from "../Models/admin.model.js";



const userSignupSchema = z.object({
    firstName: z.string().min(2, "Name must be at least 2 characters"),
    lastName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const userLoginSchema = z.object({
    email: z.string().trim().toLowerCase().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});


  
export const adminSignup = async (req, res) => {
    
    try {
        // ✅ Validate Request Body using Zod
        const parsedData = userSignupSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({ error: parsedData.error.errors });
        }

        const {firstName,lastName,email,password} = parsedData.data;

        // ✅ Check if the email already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // ✅ Hash Password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Save new user to the database
        const user = await Admin.create({ firstName,lastName, email, password: hashedPassword });

        res.status(201).json({ message: "admin registered successfully", userId: user._id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const adminLogin=async(req,res)=>{
    try {
        // ✅ Validate Request Body using Zod
        const parsedData = userLoginSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                error: parsedData.error.errors.map(err => ({
                    path: err.path[0],
                    message: err.message
                }))
            });
        }

        const { email, password } = parsedData.data;

        // ✅ Check if user exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // ✅ Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // ✅ Generate JWT token
        const token = generateAdminToken(admin._id);

        // ✅ Store token in HTTP-Only Cookie
        res.cookie("jwt", token, {
            httpOnly: true,  // Prevents JavaScript access (secure)
              // Enable in production (HTTPS)
            sameSite: "strict",  // Prevent CSRF attacks
            expires:new Date(Date.now()+24 * 60 * 60 * 1000)  // 1 days
        });

        res.status(200).json({ message: "Login successful",token,admin });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const adminLogout=(req,res)=>{
    try {
        res.clearCookie("jwt")
        res.status(200).send({message:"admin logout successfully"})
    } catch (error) {
        res.status(400).send({error:"error occured while logout"})
    }
} 

