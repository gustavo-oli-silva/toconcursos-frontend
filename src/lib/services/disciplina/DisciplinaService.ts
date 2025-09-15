import { ApiFetch } from '../ApiFetch';

export const DisciplinaService = {
    buscarDisciplinas: async () => {
        return await ApiFetch.get('disciplinas');
    },
};
