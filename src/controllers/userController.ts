import { Request, Response } from "express";
import User from "../models/User";

// create new User
const createUser = async (req: Request, res: Response) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

// update User
const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to update" });
  }
};

// delete User
const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to deleted" });
  }
};

// getSingle User
const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

// getAll User
const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      message: "Successful",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

export {
  deleteUser,
  getSingleUser,
  getAllUser,
  updateUser,
  createUser,
};
