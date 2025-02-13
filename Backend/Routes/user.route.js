import express from "express"
import { purchases, userLogin, userLogout, userSignup } from "../Controllers.js/user.controller.js";
import userMiddleWare from "../utils/userMiddleware.js";
const router=express.Router();

router.post("/signup",userSignup)
router.post("/login",userLogin)
router.get("/logout",userLogout)
router.get('/purchases',userMiddleWare,purchases)


export default router