import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Transactions } from "../Transactions";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";

const apiBasePath = import.meta.env.VITE_REACT_APP_BASEPATH;

describe("Transactions page tests", () => {
    let desktopSection: HTMLElement;

    beforeEach(() => {
        render(<Transactions />);
        desktopSection = screen.getByTestId("desktop-transactions-view");
    });

    it("should render mobile view", async () => {
        const mobileSection = screen.getByTestId("mobile-transactions-view");
        expect(
            within(mobileSection).getByText(/Transactions/i)
        ).toBeInTheDocument();
    });

    it("should render desktop view", async () => {
        expect(
            within(desktopSection).getByText(/Transactions/i)
        ).toBeInTheDocument();
    });

    it("should render Transactions table", async () => {
        const accountName = await within(desktopSection).findByText(
            "Test User"
        );
        expect(accountName).toBeInTheDocument();
    });

    it("should have Add Transaction button", async () => {
        const addButton = await within(desktopSection).findByRole("button", {
            name: /Add Transaction/i,
        });

        expect(addButton).toBeInTheDocument();
    });

    it("should open a modal when Add Transaction button is clicked", async () => {
        const addButton = await within(desktopSection).findByRole("button", {
            name: /Add Transaction/i,
        });

        await userEvent.click(addButton);

        const modalText = await screen.findByText(/Create a new transaction/i);
        expect(modalText).toBeInTheDocument();
    });

    it("should close the modal when Cancel button is clicked", async () => {
        const addButton = await within(desktopSection).findByRole("button", {
            name: /Add Transaction/i,
        });

        await userEvent.click(addButton);

        const cancelButton = screen.getByRole("button", { name: /Cancel/i });
        await userEvent.click(cancelButton);

        expect(
            screen.queryByText(/Create a new transaction/i)
        ).not.toBeInTheDocument();
    });
});

describe("Transaction form tests", () => {
    beforeEach(async () => {
        render(<Transactions />);
        const desktopSection = screen.getByTestId("desktop-transactions-view");
        const addButton = await within(desktopSection).findByRole("button", {
            name: /Add Transaction/i,
        });

        await userEvent.click(addButton);
    });

    it("should throw an error when account number is empty", async () => {
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        await userEvent.click(submitButton);

        expect(
            await screen.findByText(/Account number must be 12 digits/i)
        ).toBeInTheDocument();
    });

    it("should throw an error when account number is not 12 digits", async () => {
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        const accountNumberInput = screen.getByLabelText(/Account Number/i);
        await userEvent.type(accountNumberInput, "123");
        await userEvent.click(submitButton);

        expect(
            await screen.findByText(/Account number must be 12 digits/i)
        ).toBeInTheDocument();
    });

    it("should accept correct account number which is 12 digits", async () => {
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        const accountNumberInput = screen.getByLabelText(/Account Number/i);
        await userEvent.type(accountNumberInput, "111122223333");
        await userEvent.click(submitButton);

        expect(
            screen.queryByText(/Account number must be 12 digits/i)
        ).not.toBeInTheDocument();
    });

    it("should throw an error when account name is empty", async () => {
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        await userEvent.click(submitButton);

        expect(
            await screen.findByText(/Account name is required/i)
        ).toBeInTheDocument();
    });

    it("should accept correct account name", async () => {
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        const accountNameInput = screen.getByLabelText(/Account Name/i);
        await userEvent.type(accountNameInput, "test");
        await userEvent.click(submitButton);
        expect(
            screen.queryByText(/Account Name is required/i)
        ).not.toBeInTheDocument();
    });

    it("should throw an error when amount is empty", async () => {
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        await userEvent.click(submitButton);

        expect(
            await screen.findByText(/Amount is required/i)
        ).toBeInTheDocument();
    });

    it("should throw an error when amount is 0", async () => {
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        const amountInput = screen.getByLabelText(/Amount/i);
        await userEvent.type(amountInput, "0");
        await userEvent.click(submitButton);

        expect(
            await screen.findByText(/Amount is required and cannot be 0/i)
        ).toBeInTheDocument();
    });

    it("should accept valid amount", async () => {
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        const amountInput = screen.getByLabelText(/Amount/i);
        await userEvent.type(amountInput, "0.1");
        await userEvent.click(submitButton);

        expect(
            screen.queryByText(/Amount is required/i)
        ).not.toBeInTheDocument();
    });

    it("should create a new transaction with valid inputs", async () => {
        const submitButton = screen.getByRole("button", { name: /Submit/i });

        await userEvent.type(
            screen.getByLabelText(/Account Number/i),
            "111122223333"
        );
        await userEvent.type(
            screen.getByLabelText(/Account Name/i),
            "Test User Two"
        );
        await userEvent.type(screen.getByLabelText(/Amount/i), "100");

        await userEvent.click(screen.getByRole("button", { name: /Submit/i }));
        await userEvent.click(submitButton);

        const transactionsTable = screen.getByTestId("transactions-table");
        const newRow = await within(transactionsTable).findByText(
            "Test User Two"
        );
        expect(newRow).toBeInTheDocument();
    });
});

describe("Transactions page tests with empty state and errors", () => {
    it("should renter No transaction found text if no transactions", async () => {
        server.use(
            http.get(`${apiBasePath}/api/transactions`, () => {
                return HttpResponse.json([]);
            })
        );

        render(<Transactions />);
        const desktopSection = screen.getByTestId("desktop-transactions-view");

        const message = await within(desktopSection).findByText(
            /No transaction found/i
        );
        expect(message).toBeInTheDocument();
    });

    it("should show an error message if GET request fails", async () => {
        server.use(
            http.get(`${apiBasePath}/api/transactions`, () => {
                return HttpResponse.error();
            })
        );

        render(<Transactions />);
        const desktopSection = screen.getByTestId("desktop-transactions-view");

        const error = await within(desktopSection).findByText(
            /Unable to connect to the server/i
        );
        expect(error).toBeInTheDocument();
    });

    it("should show an error message if POST request fails", async () => {
        server.use(
            http.post(`${apiBasePath}/api/transactions`, () => {
                return HttpResponse.error();
            })
        );

        render(<Transactions />);

        const desktopSection = screen.getByTestId("desktop-transactions-view");
        const addButton = await within(desktopSection).findByRole("button", {
            name: /Add Transaction/i,
        });
        await userEvent.click(addButton);

        await userEvent.type(
            screen.getByLabelText(/Account Number/i),
            "111122223333"
        );
        await userEvent.type(
            screen.getByLabelText(/Account Name/i),
            "Fail User"
        );
        await userEvent.type(screen.getByLabelText(/Amount/i), "100");

        const submitButton = screen.getByRole("button", { name: /Submit/i });
        await userEvent.click(submitButton);

        const error = await screen.findByText(
            /Unable to connect to the server/i
        );
        expect(error).toBeInTheDocument();
    });
});
