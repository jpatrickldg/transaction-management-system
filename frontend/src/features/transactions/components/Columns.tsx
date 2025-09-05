import { type ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "../types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "transactionDate",
        header: ({ column }) => (
            <div className="min-w-40 flex items-center gap-1">
                <span className="">TRANSACTION DATE</span>
                <Button
                    variant={"ghost"}
                    className="h-6 w-6"
                    onClick={() => {
                        const sorted = column.getIsSorted(); // "asc" | "desc" | false
                        if (!sorted) {
                            column.toggleSorting(false); // Ascending
                        } else if (sorted === "asc") {
                            column.toggleSorting(true); // Descending
                        } else {
                            column.clearSorting(); // Reset
                        }
                    }}
                >
                    <ArrowUpDown className=" h-3 w-3" />
                </Button>
            </div>
        ),
        cell: ({ row }) => {
            const date = row.original.transactionDate;
            const formattedDate = format(date, "PPP");
            return <div className="">{formattedDate}</div>;
        },
    },
    {
        accessorKey: "accountNumber",
        header: ({ column }) => (
            <div className="min-w-40 flex items-center gap-1">
                <span className="">ACCOUNT NUMBER</span>
                <Button
                    variant={"ghost"}
                    className="h-6 w-6"
                    onClick={() => {
                        const sorted = column.getIsSorted(); // "asc" | "desc" | false
                        if (!sorted) {
                            column.toggleSorting(false); // Ascending
                        } else if (sorted === "asc") {
                            column.toggleSorting(true); // Descending
                        } else {
                            column.clearSorting(); // Reset
                        }
                    }}
                >
                    <ArrowUpDown className=" h-3 w-3" />
                </Button>
            </div>
        ),
        cell: ({ row }) => {
            const accountNumber = row.original.accountNumber;

            return <div className="tracking-wide">{accountNumber}</div>;
        },
    },
    {
        accessorKey: "accountHolderName",
        header: ({ column }) => (
            <div className="min-w-40 flex items-center gap-1">
                <span className="">ACCOUNT NAME</span>
                <Button
                    variant={"ghost"}
                    className="h-6 w-6"
                    onClick={() => {
                        const sorted = column.getIsSorted(); // "asc" | "desc" | false
                        if (!sorted) {
                            column.toggleSorting(false); // Ascending
                        } else if (sorted === "asc") {
                            column.toggleSorting(true); // Descending
                        } else {
                            column.clearSorting(); // Reset
                        }
                    }}
                >
                    <ArrowUpDown className=" h-3 w-3" />
                </Button>
            </div>
        ),
        cell: ({ row }) => (
            <div className="font-semibold">
                {row.original.accountHolderName}
            </div>
        ),
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <div className="min-w-20 flex items-center justify-end gap-1">
                <span className="">AMOUNT</span>
                <Button
                    variant={"ghost"}
                    className="h-6 w-6"
                    onClick={() => {
                        const sorted = column.getIsSorted(); // "asc" | "desc" | false
                        if (!sorted) {
                            column.toggleSorting(false); // Ascending
                        } else if (sorted === "asc") {
                            column.toggleSorting(true); // Descending
                        } else {
                            column.clearSorting(); // Reset
                        }
                    }}
                >
                    <ArrowUpDown className=" h-3 w-3" />
                </Button>
            </div>
        ),
        cell: ({ row }) => {
            const amount = row.original.amount;
            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "PHP",
            }).format(amount);

            return (
                <div className="text-right font-semibold">
                    {formattedAmount}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <div className="min-w-28 flex items-center justify-end gap-1">
                <span className="">STATUS</span>
                <Button
                    variant={"ghost"}
                    className="h-6 w-6"
                    onClick={() => {
                        const sorted = column.getIsSorted(); // "asc" | "desc" | false
                        if (!sorted) {
                            column.toggleSorting(false); // Ascending
                        } else if (sorted === "asc") {
                            column.toggleSorting(true); // Descending
                        } else {
                            column.clearSorting(); // Reset
                        }
                    }}
                >
                    <ArrowUpDown className=" h-3 w-3" />
                </Button>
            </div>
        ),
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <div
                    className={`w-fit px-3 py-0.5 ml-auto rounded-full ${
                        status === "Pending"
                            ? "bg-yellow-100"
                            : status === "Settled"
                            ? "bg-green-100"
                            : "bg-red-100"
                    }`}
                >
                    <div
                        className={`text-xs font-medium ${
                            status === "Pending"
                                ? "text-yellow-700"
                                : status === "Settled"
                                ? "text-green-700"
                                : "text-red-700"
                        }`}
                    >
                        {status}
                    </div>
                </div>
            );
        },
    },
];
