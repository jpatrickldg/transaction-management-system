import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewTransactionSchema, type NewTransaction } from "../types";
import { TransactionForm } from "./TransactionForm";
import { useState } from "react";
import { createTransaction } from "../api/createTransaction";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

interface AddTransactionModalProps {
    loadTransactions: () => Promise<void>;
}

export const AddTransactionModal = ({
    loadTransactions,
}: AddTransactionModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<NewTransaction>({
        resolver: zodResolver(NewTransactionSchema),
        defaultValues: {
            transactionDate: new Date(),
            accountNumber: "",
            accountHolderName: "",
            amount: undefined,
        },
    });

    const onSubmit = async (newTransaction: NewTransaction) => {
        setLoading(true);
        setError(null);
        try {
            await createTransaction(newTransaction);
            toast("Transaction has been created");
            form.reset();
            loadTransactions();
        } catch (error: any) {
            setError(
                error.message || "Something went wrong. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Transaction</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                        Create a new transaction to display on the table
                    </DialogDescription>
                </DialogHeader>
                {/* FORM */}
                {error && <p className="text-destructive text-sm">{error}</p>}
                <TransactionForm form={form} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2Icon className="animate-spin" />
                                Loading
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
