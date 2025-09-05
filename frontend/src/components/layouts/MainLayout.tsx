import type { ReactNode } from "react";
import { Toaster } from "../ui/sonner";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Toaster />
            <main className="h-screen lg:flex lg:items-center lg:justify-center bg-[#e8f0fe] overflow-y-auto">
                {children}
            </main>
        </>
    );
};
