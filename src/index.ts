import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source.ts";
import dotenv from "dotenv";

// Router
import userRoutes from "./routes/userRoute.ts";

dotenv.config();

const port = process.env.PORT || 3000;

// create and setup express app
const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    app.use("/api", userRoutes);

    // start express server
    app.listen(port, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => console.log(error));
