import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false, // You can set this based on your test needs
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated but often included for compatibility
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => {
    server.resetHandlers();
    cleanup();
});
