import { createClient } from "redis";
import app from "../index"
import request from "supertest";
import TodoLogic from "../todolist/logic";

describe("Test the todo", async () => {
    test("", async () => {
        const response = await request(app)
            .get("/api/tasks/Todo/");
        expect(response.statusCode).toBe(401);
    });

    test("", async () => {
        const response = await request(app)
            .put("/api/tasks/Todo/new");
        expect(response.statusCode).toBe(401);
    });

    test("", async () => {
        const response = await request(app)
            .put("/api/tasks/Todo/update/bulk/");
        expect(response.statusCode).toBe(401);
    });
});