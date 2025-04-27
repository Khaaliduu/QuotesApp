// routes/userRoutes.js
import express from "express";
import {
  getUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();

// GET all users
router.get("/", getUsers);

// GET single user by ID
router.get("/:id", getUserById);

// POST login user
router.post("/login", login);

// POST create new user
router.post("/register", createUser);

// PUT update user
router.put("/:id", updateUser);
// DELETE delete user
router.delete("/:id", deleteUser);

export default router;
