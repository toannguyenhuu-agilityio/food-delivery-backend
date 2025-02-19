import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source.ts";
import dotenv from "dotenv";

// Entities
import { User } from "./entities/user.ts";
import { Dish } from "./entities/dish.ts";

// Routes
import { userRoutes } from "./routes/userRoute.ts";
import { dishRoutes } from "./routes/dishRoute.ts";

dotenv.config();

const port = process.env.PORT || 3000;

// create and setup express app
const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    const userRepository = AppDataSource.getRepository(User);
    const dishRepository = AppDataSource.getRepository(Dish);

    userRoutes({ app, repository: userRepository });
    dishRoutes({ app, userRepository, dishRepository });

    // start express server
    app.listen(port, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => console.log(error));
