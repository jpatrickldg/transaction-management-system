import {
    addTransaction,
    getTransactions,
} from "../services/transactionService.js";

// @desc Get all transactions
// @route GET /api/transactions
export const getAllTransactions = (req, res, next) => {
    try {
        const transactions = getTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

// @desc Create transaction
// @route POST /api/transactions
export const createTransaction = (req, res, next) => {
    try {
        const transaction = addTransaction(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
};
