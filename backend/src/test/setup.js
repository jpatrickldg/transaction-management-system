import { vi, beforeEach, afterEach } from "vitest";
import fs from "fs";

vi.mock("fs");

beforeEach(() => {
    fs.readFileSync.mockReturnValue(
        `Transaction Date,Account Number,Account Holder Name,Amount,Status\n`
    );
    fs.appendFileSync.mockImplementation(() => {});
});

afterEach(() => {
    vi.clearAllMocks();
});
