import type { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import { ModeToggle } from "../ModeToggle";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Toaster />
            <main className="relative h-screen lg:flex lg:items-center lg:justify-center dark:bg-background bg-accent overflow-y-auto">
                <div className="absolute top-4 right-4 hidden lg:block">
                    <ModeToggle />
                </div>
                {children}
            </main>
        </>
    );
};
