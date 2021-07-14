import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, "abc123");
      req.user = await User.findById(decode.id).select("-password");
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token,not authorized");
    }
  } else {
    res.status(401);
    throw new Error("Invalid token,not authorized");
  }
  next();
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("NOt authorized as admin");
  }
};
