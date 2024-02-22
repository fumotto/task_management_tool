import app from "../src/index"
import request from "supertest";


describe("Test the login", () => {
    test("", async () => {
        const response = await request(app)
            .post("/api/signup");
        expect(response.statusCode).toBe(400);
    });
});
describe("Test the login", () => {
    test("", async () => {
        const response = await request(app)
            .post("/api/login");
        expect(response.statusCode).toBe(400);
    });
});
describe("Test the login", () => {
    test("", async () => {
        const response = await request(app)
            .get("/api/isLogined");
        expect(response.statusCode).toBe(401);
    });
});
describe("Test the login", () => {
    test("", async () => {
        const response = await request(app)
            .get("/api/logout");
        expect(response.statusCode).toBe(200);
    });
});
