import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const filePath = path.resolve("src/data/transactions.csv");

export const getTransactions = () => {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
    });

    return records.map((record) => ({
        transactionDate: record["Transaction Date"],
        accountNumber: record["Account Number"],
        accountHolderName: record["Account Holder Name"],
        amount: parseFloat(record["Amount"]),
        status: record["Status"],
    }));
};

export const addTransaction = ({
    transactionDate,
    accountNumber,
    accountHolderName,
    amount,
}) => {
    // Randomize status for new transaction
    const statuses = ["Pending", "Settled", "Failed"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    // Format account number to add hypen every 4 digits; Only for CSV
    const formattedAccountNumber = accountNumber.replace(
        /(\d{4})(?=\d)/g,
        "$1-"
    );

    // Format date to "YYYY-MM-DD"
    const formattedDate = new Date(transactionDate).toISOString().split("T")[0];

    // Format amount to add two decimal places when saving to CSV
    const formattedAmount = parseFloat(amount).toFixed(2);

    const newRow = `\n${formattedDate},${formattedAccountNumber},${accountHolderName},${formattedAmount},${status}`;

    fs.appendFileSync(filePath, newRow, "utf-8");

    return {
        transactionDate: formattedDate,
        accountNumber,
        accountHolderName,
        amount,
        status,
    };
};

// 2025-09-04T07:43:45.489Z
