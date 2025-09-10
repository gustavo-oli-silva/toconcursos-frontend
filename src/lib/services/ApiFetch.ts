export const ApiFetch = {
    request: async(
        endpoint: string,
        {method, headers, body}: RequestInit
    ) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
            method: method,
            headers: headers,
            body: JSON.stringify(body) ?? undefined
        });

        return response
    }
}