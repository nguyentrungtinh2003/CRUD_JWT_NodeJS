import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import route from "./routers/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connect success !");
    app.listen(PORT, () => {
      console.log("Server is running port : " + PORT);
    });
  })
  .catch((error) => console.log("Error : " + error));

app.use("/api", route);
