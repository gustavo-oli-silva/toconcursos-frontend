export const DisciplinaService = {
    buscarDisciplinas: async () => {
        try {
            const response = await fetch(`${process.env. NEXT_PUBLIC_API_URL}/disciplinas`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar as disciplinas: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("Erro ao buscar as disciplinas:", error);
            throw error;
        }
    }
};
