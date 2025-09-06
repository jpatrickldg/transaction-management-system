import fs from "fs";
import { addTransaction, getTransactions } from "../transactionService";

const sampleCsv = `Transaction Date,Account Number,Account Holder Name,Amount,Status
2025-01-01,1234-5678-9012,John Doe,100.50,Pending
`;

describe("Transaction service tests", () => {
    it("should parse CSV correctly with getTransactions", () => {
        fs.readFileSync.mockReturnValue(sampleCsv);

        const result = getTransactions();

        expect(result).toEqual([
            {
                transactionDate: "2025-01-01",
                accountNumber: "123456789012",
                accountHolderName: "John Doe",
                amount: 100.5,
                status: "Pending",
            },
        ]);
    });

    it("should throw if account number exists with different name with addTransaction", () => {
        fs.readFileSync.mockReturnValue(sampleCsv);

        expect(() =>
            addTransaction({
                transactionDate: "2025-02-01",
                accountNumber: "123456789012",
                accountHolderName: "Jane Doe",
                amount: 200,
            })
        ).toThrow(
            "Account number is linked with a different account holder name."
        );
    });

    it("should append new row and returns object with addTransaction", () => {
        fs.readFileSync.mockReturnValue(sampleCsv);
        fs.appendFileSync.mockImplementation(() => {});

        const result = addTransaction({
            transactionDate: "2025-02-01",
            accountNumber: "999988887777",
            accountHolderName: "Alice",
            amount: 300,
        });

        expect(fs.appendFileSync).toHaveBeenCalled();
        expect(result).toHaveProperty("transactionDate", "2025-02-01");
        expect(result).toHaveProperty("accountNumber", "999988887777");
        expect(result).toHaveProperty("accountHolderName", "Alice");
        expect(result).toHaveProperty("amount", 300);
        expect(["Pending", "Settled", "Failed"]).toContain(result.status);
    });
});
