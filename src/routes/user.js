import express from "express";
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from "../controller/user.js";
import upload from "../config/multer.js";

const userRouter = express.Router();

// User register
userRouter.post('/', upload.single('profilePicture'), createUser);

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);
userRouter.put('/:id', updateUserById);

export default userRouter;