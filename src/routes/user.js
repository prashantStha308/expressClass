import express from "express";
import { createUser, deleteUserById, getAllUsers, getUserById } from "../controller/user.js";
import upload from "../config/multer.js";

const userRouter = express.Router();

userRouter.post('/', upload.single('profilePicture') ,createUser);
userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);

export default userRouter;