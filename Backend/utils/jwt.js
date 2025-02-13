import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token valid for 7 days
    });
};
