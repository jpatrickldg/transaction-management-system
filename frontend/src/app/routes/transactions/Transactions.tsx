import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchTransactions } from "@/features/transactions/api/getTransactions";
import { AddTransactionModal } from "@/features/transactions/components/AddTransactionModal";
import { Card } from "@/features/transactions/components/Card";
import { columns } from "@/features/transactions/components/Columns";
import { DataTable } from "@/features/transactions/components/DataTable";
import type { Transaction } from "@/features/transactions/types";
import { useEffect, useState } from "react";

export const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchTransactions();
            setTransactions(data);
        } catch (error: any) {
            setError(
                error.message ||
                    "Something went wrong. Please try again after a while."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransactions();
    }, []);
    return (
        <>
            {/* MOBILE */}
            <section
                data-testid="mobile-transactions-view"
                className="lg:hidden h-full flex flex-col gap-4 overflow-y-auto"
            >
                <header className="flex justify-between px-4 pt-4 md:px-6">
                    <div className="flex flex-col justify-center sm:items-center sm:flex-row gap-1 sm:gap-4">
                        <h1 className="text-xl font-bold">Transactions</h1>
                        {!loading && !error && (
                            <AddTransactionModal
                                loadTransactions={loadTransactions}
                            />
                        )}
                    </div>
                    <ModeToggle />
                </header>
                {loading && (
                    <Skeleton className="h-60 w-[300px] mx-auto rounded-md bg-card" />
                )}
                {error && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-1 px-4 md:px-6">
                        <h3 className="text-lg font-semibold text-destructive">
                            Oops! Something went wrong
                        </h3>
                        <p className="text-sm text-destructive">{error}</p>
                        <Button
                            onClick={loadTransactions}
                            variant={"destructive"}
                            className="mt-2"
                        >
                            Retry
                        </Button>
                    </div>
                )}
                {!loading &&
                    !error &&
                    (transactions.length > 0 ? (
                        <div className="flex-1 flex flex-wrap justify-center gap-4 px-4 pb-6 md:px-6 overflow-y-auto">
                            {transactions.map((transaction, index) => (
                                <Card transaction={transaction} key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-muted-foreground">
                                No transaction found
                            </p>
                        </div>
                    ))}
            </section>
            {/* DESKTOP */}
            <section
                data-testid="desktop-transactions-view"
                className="hidden lg:block px-10 py-8 bg-card text-card-foreground rounded"
            >
                <header className="flex justify-between">
                    <h1 className="text-xl font-bold">Transactions</h1>
                    {!loading && !error && (
                        <AddTransactionModal
                            loadTransactions={loadTransactions}
                        />
                    )}
                </header>
                <div className="mt-4">
                    {loading && <Skeleton className="w-3xl h-[500px]" />}
                    {error && (
                        <div className="w-3xl h-[500px] flex flex-col items-center justify-center gap-2">
                            <h3 className="text-lg font-semibold text-destructive">
                                Oops! Something went wrong
                            </h3>
                            <p className="text-sm text-destructive">{error}</p>
                            <Button
                                onClick={loadTransactions}
                                variant={"destructive"}
                                className="mt-2"
                            >
                                Retry
                            </Button>
                        </div>
                    )}
                    {!loading && !error && (
                        <DataTable columns={columns} data={transactions} />
                    )}
                </div>
            </section>
        </>
    );
};
