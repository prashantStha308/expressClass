import mongoose from "mongoose";
import User from "../models/user.js";
import fs from "fs";

export const createUser = async (req, res) => {
    try {
        const body = req.body;
        const file = req.file;

        if (!body.name || !body.email || !body.password) {
            throw new Error("Required Fields not filled");
        }

        if (!file) {
            throw new Error("Profile Picture not uplaoded");
        }

        const filePath = file.path;
        console.log(filePath);

        const newUser = await User.create({
            name: body.name,
            email: body.email,
            password: body.password,
            profilePicture: filePath.replace(/^src/, "")
            // "/storage/1751040958305pngwing.com.png"
        })

        if (!newUser) {
            throw new Error("Failed to create User")
        }

        res.status(201).json({
            success: true,
            data: newUser,
            message: 'User created Successfully'
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to Create User"
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if ( !mongoose.Types.ObjectId.isValid(id) ) {
            throw new Error("Invalid ID");
        }

        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            data: user,
            message: "User fetched successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to Fetch User"
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            data: users,
            message: "Users fetched successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to Fetch User"
        })
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if ( !mongoose.Types.ObjectId.isValid(id) ) {
            throw new Error("Invalid ID");
        }

        const user = await User.findByIdAndDelete(id);

        fs.unlink( "src" + user.profilePicture , (err) => {
            if (err) {
                console.log("Error deleting file: ", err);
            } else {
                console.log("Deleted File SUccessfully");
            }
        });

        res.status(200).json({
            success: true,
            data: user,
            message: "Users deleted successfully"
        });
        

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to Fetch User"
        })
    }
}

export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID");
        }

        if (!body.name || !body.email || !body.password) {
            throw new Error("Required Fields not filled");
        }

        const user = await User.findByIdAndUpdate(id, body);

        res.status(200).json({
            success: true,
            data: user,
            message: "User Updated Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to Create User"
        })
    }
}