import { userController } from "../controllers/user.ts";

export const userRoutes = ({
  app,
  repository,
  controller = userController,
}) => {
  const { getUser, getUserById, createUser, updateUser, deleteUser } =
    controller(repository);

  app.route("/api/users").get(getUser).post(createUser);

  app
    .route("/api/users/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
};
