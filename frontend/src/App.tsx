import { useEffect, useState } from "react";
import { AddTransactionModal } from "./features/transactions/components/AddTransactionModal";
import { columns } from "./features/transactions/components/Columns";
import { DataTable } from "./features/transactions/components/DataTable";
import type { Transaction } from "./features/transactions/types";
import { fetchTransactions } from "./features/transactions/api/getTransactions";
import { Toaster } from "./components/ui/sonner";
import { Skeleton } from "./components/ui/skeleton";
import { Button } from "./components/ui/button";

function App() {
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
            <Toaster />
            <main className="h-screen flex items-center justify-center bg-[#e8f0fe]">
                <section className="p-10 bg-white rounded-lg">
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
                            <div className="w-3xl h-[500px] flex flex-col items-center gap-2 justify-center">
                                <h3 className="text-lg font-semibold text-destructive">
                                    Oops! Something went wrong
                                </h3>
                                <p className="text-sm text-destructive">
                                    {error}
                                </p>
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
            </main>
        </>
    );
}

export default App;
