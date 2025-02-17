import express from "express"
import { purchases, userLogin, userLogout, userSignup } from "../Controllers.js/user.controller.js";
import userMiddleWare from "../utils/adminMiddleware.js";
import { adminLogin, adminLogout, adminSignup } from "../Controllers.js/admin.controller.js";
const router=express.Router();

router.post("/signup",adminSignup)
router.post("/login",adminLogin)
router.get("/logout",adminLogout)



export default router