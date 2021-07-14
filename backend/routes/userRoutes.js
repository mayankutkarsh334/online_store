import express from "express";
import {
  getUser,
  getUsers,
  updateUserProfile,
  userAuth,
  userRegister,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(userRegister).get(protect, admin, getUsers);
router.route("/login").post(userAuth);
router.route("/profile").get(protect, getUser).put(protect, updateUserProfile);

export default router;
