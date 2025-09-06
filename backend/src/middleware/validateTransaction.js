export const validateTransaction = (req, res, next) => {
    const { transactionDate, accountNumber, accountHolderName, amount } =
        req.body;

    const sendError = (message) => {
        const error = new Error(message);
        error.status = 400;
        return next(error);
    };
    // Required fields validation
    if (!transactionDate) return sendError("Transaction date is required.");
    if (!accountNumber) return sendError("Account number is required.");
    if (!accountHolderName)
        return sendError("Account holder name is required.");
    if (amount === undefined || amount === null)
        return sendError("Amount is required.");

    // Date validation
    const date = new Date(transactionDate);
    if (isNaN(date.getTime())) {
        return sendError("Invalid transaction date.");
    }

    // Amount validation
    if (isNaN(parseFloat(amount)) || parseFloat(amount) === 0) {
        return sendError("Amount must be a number and cannot be 0.");
    }

    // Account number validation (must be 12 digits)
    if (!/^\d{12}$/.test(accountNumber)) {
        return sendError("Account number must be 12 digits.");
    }

    next();
};
