const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")



afterAll(async () => {
	await db.destroy()
})

describe("users integration tests", () => {
	it("GET /api/auth/testusers", async () => {
		const res = await supertest(server).get("/api/auth/testusers")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body[0].username).toBe("Ignacio")
	})
})

describe("users integration tests", () => {
	it("GET /api/auth/testusers", async () => {
		const res = await supertest(server).get("/api/auth/testusers")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body[1].username).toBe("Ignacio2")
	})
})

it("POST /api/auth/register", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "Ignacio10", password: "12345" })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toBe("Ignacio10")
})

it("POST /api/auth/register", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "Ignacio100", password: "12345" })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toBe("Ignacio100")
})

it("DELETE /api/auth/testusers/:id", async () => {
    const res = await supertest(server)
        .delete("/api/auth/testusers/9")
    expect(res.statusCode).toBe(204)
})




