import express from "express";
import {
  createUser,
  login,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

const route = express.Router();

route.post("/user", createUser);
route.post("/login", login);
route.get("/user", getAllUser);
route.get("/user/:id", getUserById);
route.put("/update:id", updateUser);
route.delete("/delete:id", deleteUser);

export default route;
