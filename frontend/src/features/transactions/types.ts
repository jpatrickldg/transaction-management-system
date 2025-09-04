import { z } from "zod";

// Used for creating transaction
export const NewTransactionSchema = z.object({
    transactionDate: z.date(),
    accountHolderName: z.string().min(1, "Account name is required"),
    accountNumber: z
        .string()
        .regex(/^\d{12}$/, "Account number must be 12 digits"),
    amount: z.number().gt(0, "Amount should be greater than 0"),
});

export const TransactionSchema = NewTransactionSchema.extend({
    status: z.enum(["Pending", "Settled", "Failed"]),
});

export type NewTransaction = z.infer<typeof NewTransactionSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
