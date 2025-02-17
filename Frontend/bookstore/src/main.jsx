import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const stripePromise = loadStripe(
  "pk_test_51Qt6FiBrim1meWcKW2YmMmVi0yUVArXyc9meXLdhLuUy0gbRoRo6IRuMXkjqtvq5QP66P2JJgajRjCFVqli18inj00TN3Q7uBA"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
   
      <App />
    
  </Elements>
);