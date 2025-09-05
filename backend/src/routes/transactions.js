import express from "express";
import {
    createTransaction,
    getAllTransactions,
} from "../controllers/transactionController.js";
import { validateTransaction } from "../middleware/validateTransaction.js";

const router = express.Router();

// Get all transactions
router.get("/", getAllTransactions);

// Create transaction
router.post("/", validateTransaction, createTransaction);

export default router;
