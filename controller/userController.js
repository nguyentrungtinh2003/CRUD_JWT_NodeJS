import User from "../model/userModel.js";

export const createUser = async (req, res) => {
  try {
    const user = await new User(req.body);
    const { email } = user;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already exists" });
    }
    const saveUser = user.save();
    res.status(200).json({ message: "User saved success !", saveUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = User.find();
    if (users == null || users.length == 0) {
      res.status(500).json({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = User.findById(id);
    if (user == null) {
      res.status(500).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = User.findById(id);
    if (user == null) {
      res.status(500).json({ message: "User not found" });
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
