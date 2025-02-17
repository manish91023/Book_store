import { Order } from "../Morder.model.js";
import {Purchase,Course} from "../Models/purchase.model.js"

export const orderData = async (req, res) => {
  const order = req.body;
  try {
    const orderInfo = await Order.create(order);
   
    const userId = orderInfo?.userId;
    const courseId = orderInfo?.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }
   const amount = course.price;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(201).json({
      message: "Course purchased successfully",
      course,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Error in order: ", error);
    res.status(401).json({ errors: "Error in order creation" });
  }
};