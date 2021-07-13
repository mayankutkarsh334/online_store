import express from "express";
import {
  getUser,
  updateUserProfile,
  userAuth,
  userRegister,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(userRegister);
router.route("/login").post(userAuth);
router.route("/profile").get(protect, getUser).put(protect, updateUserProfile);

export default router;
