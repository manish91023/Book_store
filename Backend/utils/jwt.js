import jwt from "jsonwebtoken";

export const generateUserToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token valid for 7 days
    });
};

export const generateAdminToken = (adminId) => {
    return jwt.sign({ adminId }, process.env.ADMIN_SECRET, {
        expiresIn: "1d", // Token valid for 7 days
    });
};
