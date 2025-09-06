import { z } from "zod";

// Used for creating transaction
export const NewTransactionSchema = z.object({
    transactionDate: z.date("Invalid date."),
    accountHolderName: z.string().min(1, "Account holder name is required."),
    accountNumber: z
        .string()
        .regex(/^\d{12}$/, "Account number must be 12 digits."),
    amount: z.coerce
        .number<number>({ error: "Amount is required." })
        .refine((val) => val !== 0, {
            message: "Amount is required and cannot be 0.",
        }),
});

export const TransactionSchema = NewTransactionSchema.extend({
    status: z.enum(["Pending", "Settled", "Failed"]),
});

export type NewTransaction = z.infer<typeof NewTransactionSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
