import type { Transaction } from "../types";
import { format } from "date-fns";

interface CardProps {
    transaction: Transaction;
}

export const Card = ({ transaction }: CardProps) => {
    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
    }).format(transaction.amount);
    return (
        <div className="relative bg-card text-card-foreground rounded-md p-4 sm:basis-[300px] basis-full space-y-2 text-sm">
            <div
                className={`w-fit px-3 py-0.5 ml-auto rounded-full absolute top-4 right-4 ${
                    transaction.status === "Pending"
                        ? "bg-yellow-100"
                        : transaction.status === "Settled"
                        ? "bg-green-100"
                        : "bg-red-100"
                }`}
            >
                <div
                    className={`text-xs font-medium ${
                        transaction.status === "Pending"
                            ? "text-yellow-700"
                            : transaction.status === "Settled"
                            ? "text-green-700"
                            : "text-red-700"
                    }`}
                >
                    {transaction.status}
                </div>
            </div>
            <div>
                <p className="text-sm font-medium">Transaction Date</p>
                <p className="">{format(transaction.transactionDate, "PPP")}</p>
            </div>
            <div>
                <p className="text-sm font-medium">Account Number</p>
                <p className="tracking-wide">
                    {transaction.accountNumber.replace(/(\d{4})(?=\d)/g, "$1-")}
                </p>
            </div>
            <div>
                <p className="text-sm font-medium">Account Name</p>
                <p className="">{transaction.accountHolderName}</p>
            </div>
            <div>
                <p className="text-sm font-medium">Amount</p>
                <p className="">{formattedAmount}</p>
            </div>
        </div>
    );
};
