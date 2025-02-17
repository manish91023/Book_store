import { Course } from "../Models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../Models/purchase.model.js";
export const createCourse = async (req, res) => {
  const { title, description, price } = req.body;
  const creatorId = req.adminId;

  try {
    // Check for required fields
    if (!title || !description || !price) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    if (!req.files || !req.files.image) {
      console.log(req.files); // Log the entire files object to debug
      return res
        .status(400)
        .json({ error: "No file uploaded or file field name is incorrect" });
    }

    const { image } = req.files;

    // Check allowed formats
    const allowedFormats = ["image/png", "image/jpeg"];
    if (!allowedFormats.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ error: "Only JPG and PNG files are supported" });
    }

    // Upload image to Cloudinary
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

    if (!cloud_response || !cloud_response.secure_url) {
      return res
        .status(500)
        .json({ error: "Error uploading file to Cloudinary" });
    }

    // Save course to database
    const course = await Course.create({
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      },
      creatorId,
    });

    return res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred during course creation" });
  }
};

export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const creatorId = req.adminId;
  const { title, price, description, image } = req.body;

  try {
    // 🔹 Fetch the existing course before updating
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // 🔹 Update the course details
    const updatedCourse = await Course.updateOne(
      { _id: courseId, creatorId },
      {
        title: title || course.title, // If title is not provided, keep the existing one
        description: description || course.description,
        price: price || course.price,
        image: {
          public_id: image?.public_id || course.image.public_id,
          url: image?.url || course.image.url,
        },
      }
    );

    res
      .status(200)
      .json({ message: "Course updated successfully", updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating the course" });
  }
};

export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    // 🔹 Find the course before deleting
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // 🔹 Delete the course
    await Course.deleteOne({ _id: courseId });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting the course" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses
    res.status(200).json({ message: "Courses fetched successfully", courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching courses" });
  }
};

export const getCourseById = async (req, res) => {
  const { courseId } = req.params; // Extract course ID from URL
console.log("course id",courseId)
  try {
    const course = await Course.findById(courseId); // Fetch course by ID

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course fetched successfully", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching course details" });
  }
};

import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Qt6FiBrim1meWcKoNQdY63saXeeBIW8bB6cfJxKu3zYLozxnry6V1RHpubU20HVaNmng1Rwo21NH23tdzFJxAw000weWEue4H"
);
export const buyCourses = async (req, res) => {
  const { userId } = req;
  console.log("this is user id", userId);
  const { courseId } = req.params;
  console.log("course id", courseId);

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send({ error: "course not found" });
    }
    const existingPurchase = await Purchase.find({ courseId, userId }).exec();
    console.log("existing ", existingPurchase);
    if (existingPurchase.length > 0) {
      return res.status(400).send("user has already purchased this course");
    }

    // stripe payment code goes here!!
    const amount = course.price;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    const purchase = await Purchase.create({
        userId,
        courseId,
        transactionId: paymentIntent.id,
      });
      
    res.status(201).json({
      message: "Course purchased successfully",
      course,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: "error in course buying" });
    console.log(error);
  }
};
