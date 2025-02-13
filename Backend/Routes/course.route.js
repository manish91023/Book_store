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
const router = express.Router();

router.post("/create", createCourse);
router.post("/update/:courseId", updateCourse);
router.post("/buy/:courseId",userMiddleWare, buyCourses);
router.delete("/delete/:courseId", deleteCourse);
router.get("/getCourse/:courseId", getCourseById);
router.get("/getAllCourses", getAllCourses);
export default router;
