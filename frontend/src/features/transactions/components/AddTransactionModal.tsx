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

export const AddTransactionModal = () => {
    const form = useForm<NewTransaction>({
        resolver: zodResolver(NewTransactionSchema),
        defaultValues: {
            transactionDate: new Date(),
            accountNumber: "",
            accountHolderName: "",
            amount: undefined,
        },
    });

    const onSubmit = async (values: NewTransaction) => {
        console.log(values);
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
                <TransactionForm form={form} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
