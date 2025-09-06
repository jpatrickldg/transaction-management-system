import { beforeEach } from "vitest";
import { validateTransaction } from "../validateTransaction";

describe("Validate transaction middleware tests", () => {
    const mockRes = {};
    let mockNext;

    beforeEach(() => {
        mockNext = vi.fn();
    });

    it("calls next with error if transactionDate is missing", () => {
        const req = {
            body: {
                accountNumber: "123456789012",
                accountHolderName: "John",
                amount: 100,
            },
        };
        validateTransaction(req, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        expect(mockNext.mock.calls[0][0].message).toBe(
            "Transaction date is required."
        );
        expect(mockNext.mock.calls[0][0].status).toBe(400);
    });

    it("calls next with error if transactionDate is not a valid date", () => {
        const req = {
            body: {
                transactionDate: "invalid",
                accountNumber: "123456789012",
                accountHolderName: "John",
                amount: 100,
            },
        };
        validateTransaction(req, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        expect(mockNext.mock.calls[0][0].message).toBe(
            "Invalid transaction date."
        );
        expect(mockNext.mock.calls[0][0].status).toBe(400);
    });

    it("calls next with error if accountNumber is invalid", () => {
        const req = {
            body: {
                transactionDate: "2025-01-01",
                accountNumber: "123",
                accountHolderName: "John",
                amount: 100,
            },
        };
        validateTransaction(req, mockRes, mockNext);

        const err = mockNext.mock.calls[0][0];
        expect(err.message).toBe("Account number must be 12 digits.");
        expect(err.status).toBe(400);
    });

    it("calls next with error if amount is invalid", () => {
        const req = {
            body: {
                transactionDate: "2025-01-01",
                accountNumber: "123",
                accountHolderName: "John",
                amount: 0,
            },
        };
        validateTransaction(req, mockRes, mockNext);

        const err = mockNext.mock.calls[0][0];
        expect(err.message).toBe("Amount must be a number and cannot be 0.");
        expect(err.status).toBe(400);
    });

    it("calls next with no args if valid", () => {
        const req = {
            body: {
                transactionDate: "2025-01-01",
                accountNumber: "123456789012",
                accountHolderName: "John",
                amount: 100,
            },
        };
        validateTransaction(req, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(); // no error
    });
});
