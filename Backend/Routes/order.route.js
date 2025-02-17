import express from "express";
import {orderData} from "../Controllers.js/order.controller.js"
import userMiddleWare from "../utils/userMiddleware.js";

const router = express.Router();

router.post("/", userMiddleWare, orderData);

export default router;