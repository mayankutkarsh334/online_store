import express from "express";
import {
  deleteUser,
  getUser,
  getUserById,
  getUsers,
  updateUser,
  updateUserProfile,
  userAuth,
  userRegister,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(userRegister).get(protect, admin, getUsers);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
router.route("/login").post(userAuth);
router.route("/profile").get(protect, getUser).put(protect, updateUserProfile);

export default router;
