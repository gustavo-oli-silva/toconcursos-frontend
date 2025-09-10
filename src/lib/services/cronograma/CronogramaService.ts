
export const CronogramaService = {
  salvarCronograma: async (cronograma: any) => {
    try {
      const response = await fetch(`${`${process.env. NEXT_PUBLIC_API_URL}/cronogramas`}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cronograma),
      });

      if (!response.ok) {
        throw new Error(`Erro ao salvar o cronograma: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Erro ao salvar o cronograma:", error);
      throw error;
    }
  },

  buscarCronogramas: async () => {
    try {
      const response = await fetch(`${process.env. NEXT_PUBLIC_API_URL}/cronogramas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar os cronogramas: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Erro ao buscar os cronogramas:", error);
      throw error;
    }
  },

  atualizarCronograma: async (id: number, cronograma: any) => {
    try {
      const response = await fetch(`${process.env. NEXT_PUBLIC_API_URL}/cronogramas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cronograma),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar o cronograma: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Erro ao atualizar o cronograma:", error);
      throw error;
    }
  },

  deletarCronograma: async (id: number) => {
    try {
      const response = await fetch(`${process.env. NEXT_PUBLIC_API_URL}/cronogramas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar o cronograma: ${response.status}`);
      }

      return;
    } catch (error: any) {
      console.error("Erro ao deletar o cronograma:", error);
      throw error;
    }
  },
}
