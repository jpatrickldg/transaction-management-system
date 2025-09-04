import express from "express";
import transactions from "./routes/transactions.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import cors from "cors";

const app = express();

// Cors
app.use(cors());

// Body parser middleware
app.use(express.json());

// Routes
app.use("/api/transactions", transactions);

// Error Handler
app.use(notFound);
app.use(errorHandler);

export default app;
