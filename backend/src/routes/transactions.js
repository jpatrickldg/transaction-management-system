import express from "express";
import {
    createTransaction,
    getAllTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

// Get all transactions
router.get("/", getAllTransactions);

// Create transaction
router.post("/", createTransaction);

export default router;
