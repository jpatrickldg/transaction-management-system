import { setupServer } from "msw/node";
import { transactionsHandlers } from "./handlers/transactions";

export const server = setupServer(...transactionsHandlers);
