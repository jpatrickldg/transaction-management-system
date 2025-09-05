import type { NewTransaction } from "../types";

export const createTransaction = async (newTransaction: NewTransaction) => {
    const apiBasePath = import.meta.env.VITE_REACT_APP_BASEPATH;
    const url = `${apiBasePath}/api/transactions`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTransaction),
        });

        if (!response.ok) {
            let message = `Response status: ${response.status}`;
            try {
                const errorData = await response.json();
                if (errorData?.message) {
                    message = errorData.message;
                }
            } catch {
                // No JSON body, fallback to status-based message
            }
            throw new Error(message);
        }

        return response.json();
    } catch (error: any) {
        if (error.message === "Failed to fetch") {
            throw new Error(
                "Unable to connect to the server. Please check your internet or try again later."
            );
        }
        throw error;
    }
};
