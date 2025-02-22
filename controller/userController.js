import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    const saveUser = newUser.save();
    res.status(200).json({ message: "User saved success !", saveUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const userExist = await User.findOne({ name });
    if (!password) {
      return res.status(400).json({ message: "Password is required" }); // Kiểm tra password có tồn tại không
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: userExist._id, name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login success !", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users == null || users.length == 0) {
      return res.status(500).json({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user == null) {
      return res.status(500).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user == null) {
      return res.status(500).json({ message: "User not found" });
    }
    const userUpdate = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
