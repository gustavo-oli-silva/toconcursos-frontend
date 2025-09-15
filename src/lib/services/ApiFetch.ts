export const ApiFetch = {
  request: async (
    endpoint: string,
    { method, headers, body }: RequestInit
  ) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body) ?? undefined
    });

    return response;
  },

  get: async (endpoint: string, headers?: Record<string, string>) => {
    const response = await ApiFetch.request(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...headers },
    });
    return ApiFetch.handleResponse(response);
  },

  post: async (endpoint: string, body?: any, headers?: Record<string, string>) => {
    const response = await ApiFetch.request(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body,
    });
    return ApiFetch.handleResponse(response);
  },

  put: async (endpoint: string, body?: any, headers?: Record<string, string>) => {
    const response = await ApiFetch.request(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...headers },
      body,
    });
    return ApiFetch.handleResponse(response);
  },

  delete: async (endpoint: string, headers?: Record<string, string>) => {
    const response = await ApiFetch.request(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", ...headers },
    });
    return ApiFetch.handleResponse(response);
  },

  handleResponse: async (response: Response) => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    try {
      return await response.json();
    } catch {
      return null; 
    }
  },
};