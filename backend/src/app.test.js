import request from "supertest";
import app from "./app";
import fs from "fs";

describe("API integration tests", () => {
    it("should return 200 with GET /api/transactions when data is available", async () => {
        const res = await request(app).get("/api/transactions");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty("transactionDate");
            expect(res.body[0]).toHaveProperty("accountNumber");
            expect(res.body[0]).toHaveProperty("accountHolderName");
            expect(res.body[0]).toHaveProperty("amount");
            expect(res.body[0]).toHaveProperty("status");
        }
    });

    it("should return 201 with POST /api/transactions when request is valid", async () => {
        const payload = {
            transactionDate: "2025-02-01",
            accountNumber: "999988887777",
            accountHolderName: "Alice",
            amount: 300,
        };

        const res = await request(app).post("/api/transactions").send(payload);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("transactionDate", "2025-02-01");
        expect(res.body).toHaveProperty("accountNumber", "999988887777");
        expect(res.body).toHaveProperty("accountHolderName", "Alice");
        expect(res.body).toHaveProperty("amount", 300);
        expect(["Pending", "Settled", "Failed"]).toContain(res.body.status);
    });

    it("should return 400 with POST /api/transactions when data is invalid", async () => {
        const res = await request(app).post("/api/transactions").send({}); // missing fields

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(typeof res.body.message).toBe("string");
    });

    it("should return 400 with POST /api/transactions when account number is linked to a different name", async () => {
        fs.readFileSync
            .mockReturnValue(`Transaction Date,Account Number,Account Holder Name,Amount,Status
2025-02-01,111122223333,Bob,150,Pending
`);

        // Try with same account number but different name
        const res = await request(app).post("/api/transactions").send({
            transactionDate: "2025-02-02",
            accountNumber: "111122223333",
            accountHolderName: "Charlie",
            amount: 200,
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty(
            "message",
            "Account number is linked with a different account holder name."
        );
    });
});
