import { http, HttpResponse } from "msw";

const apiBasePath = import.meta.env.VITE_REACT_APP_BASEPATH;

const transactions = [
    {
        transactionDate: Date.now(),
        accountNumber: "111122223333",
        accountHolderName: "Test User",
        amount: 100,
        status: "Pending",
    },
];

export const transactionsHandlers = [
    http.get(`${apiBasePath}/api/transactions`, () => {
        return HttpResponse.json(transactions);
    }),

    http.post(`${apiBasePath}/api/transactions`, async ({ request }) => {
        const newTransaction: any = await request.json();

        transactions.push({ ...newTransaction, status: "Pending" });
        return HttpResponse.json(newTransaction);
    }),
];
