import express from "express";
import {
  buyCourses,
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../Controllers.js/course.controller.js";
import userMiddleWare from "../utils/userMiddleware.js";
import adminMiddleWare from "../utils/adminMiddleware.js";
const router = express.Router();

router.post("/create", adminMiddleWare,createCourse);
router.put("/update/:courseId", adminMiddleWare,updateCourse);
router.post("/buy/:courseId",userMiddleWare, buyCourses);
router.delete("/delete/:courseId",adminMiddleWare, deleteCourse);
router.get("/getCourse/:courseId", getCourseById);
router.get("/getAllCourses", getAllCourses);
export default router;
