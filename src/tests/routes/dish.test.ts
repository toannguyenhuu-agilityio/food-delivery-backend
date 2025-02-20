import request from "supertest";
import express from "express";

// Mocks
import { DISH } from "../../__mocks__/dish.ts";

// Constants
import { STATUS_CODES } from "../../constants/httpStatusCodes.ts";
import { dishRoutes } from "../../routes/dish.ts";

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

jest.mock("../../controllers/dish", () => ({
  dishController: jest.fn().mockImplementation(() => ({
    getDishes: jest.fn((req, res) =>
      res.status(STATUS_CODES.OK).json({ message: "Get all dishes" }),
    ),
    getDishesByCategory: jest.fn((req, res) =>
      res.status(STATUS_CODES.OK).json({ message: "Get dishes by category" }),
    ),
    getDishById: jest.fn((req, res) =>
      res.status(STATUS_CODES.OK).json({ message: "Get dish by ID" }),
    ),
    createDish: jest.fn((req, res) =>
      res.status(STATUS_CODES.CREATED).json({ message: "Dish created" }),
    ),
    updateDishById: jest.fn((req, res) =>
      res.status(STATUS_CODES.OK).json({ message: "Dish updated" }),
    ),
    deleteDishById: jest.fn((req, res) =>
      res.status(STATUS_CODES.OK).json({ message: "Dish deleted" }),
    ),
  })),
}));

describe("Dish Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();

    dishRoutes({
      app,
      userRepository: mockRepository,
      dishRepository: mockRepository,
    });
  });

  it("should create a new dish", async () => {
    const response = await request(app).post("/dish").send(DISH);

    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body).toEqual({ message: "Dish created" });
  });

  it("should get all dishes", async () => {
    const response = await request(app).get("/dishes"); // Replace with the actual route

    expect(response.status).toBe(STATUS_CODES.OK);
    expect(response.body).toEqual({ message: "Get all dishes" });
  });

  it("should get dishes by ID", async () => {
    const response = await request(app).get("/dish/1"); // Replace with the actual route

    expect(response.status).toBe(STATUS_CODES.OK);
    expect(response.body).toEqual({ message: "Get dish by ID" });
  });

  it("should update a dish by ID", async () => {
    const response = await request(app).put("/dish/1").send(DISH);

    expect(response.status).toBe(STATUS_CODES.OK);
    expect(response.body).toEqual({ message: "Dish updated" });
  });

  it("should delete a dish by ID", async () => {
    const response = await request(app).delete("/dish/1"); // Replace with the actual route

    expect(response.status).toBe(STATUS_CODES.OK);
    expect(response.body).toEqual({ message: "Dish deleted" });
  });
});
