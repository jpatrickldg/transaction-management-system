import { AddTransactionModal } from "./features/transactions/components/AddTransactionModal";
import { columns } from "./features/transactions/components/Columns";
import { DataTable } from "./features/transactions/components/DataTable";
import type { Transaction } from "./features/transactions/types";

export const sampleTransactions: Transaction[] = [
    {
        transactionDate: new Date(), // today
        accountHolderName: "Mark Henry",
        accountNumber: "123456789012",
        amount: 150,
        status: "Pending",
    },
    {
        transactionDate: new Date(new Date().setDate(new Date().getDate() - 1)), // yesterday
        accountHolderName: "Davis Henry",
        accountNumber: "223344556677",
        amount: 200,
        status: "Settled",
    },
    {
        transactionDate: new Date(new Date().setDate(new Date().getDate() - 7)), // 7 days ago
        accountHolderName: "Anna Smith",
        accountNumber: "445566778899",
        amount: 300,
        status: "Pending",
    },
    {
        transactionDate: new Date(
            new Date().setDate(new Date().getDate() - 10)
        ), // 10 days ago
        accountHolderName: "Lucy Lee",
        accountNumber: "556677889900",
        amount: 125.25,
        status: "Settled",
    },
    {
        transactionDate: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
        accountHolderName: "John Henry",
        accountNumber: "334455667788",
        amount: 75.5,
        status: "Failed",
    },
];

function App() {
    return (
        <main className="h-screen flex items-center justify-center bg-[#e8f0fe]">
            <section className="p-10 bg-white rounded-lg">
                <header className="flex justify-between">
                    <h1 className="text-xl font-bold">Transactions</h1>
                    <AddTransactionModal />
                </header>
                <div className="mt-4">
                    <DataTable columns={columns} data={sampleTransactions} />
                </div>
            </section>
        </main>
    );
}

export default App;
