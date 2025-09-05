export const fetchTransactions = async () => {
    const apiBasePath = import.meta.env.VITE_REACT_APP_BASEPATH;
    const url = `${apiBasePath}/api/transactions`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
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
