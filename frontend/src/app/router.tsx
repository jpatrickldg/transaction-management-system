import { MainLayout } from "@/components/layouts/MainLayout";
import { Transactions } from "./routes/transactions/Transactions";
import { ThemeProvider } from "@/components/ThemeProvider";

export const AppRouter = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <MainLayout>
                <Transactions />
            </MainLayout>
        </ThemeProvider>
    );
};
