import { MainLayout } from "@/components/layouts/MainLayout";
import { Transactions } from "./routes/transactions/Transactions";

export const AppRouter = () => {
    return (
        <MainLayout>
            <Transactions />
        </MainLayout>
    );
};
