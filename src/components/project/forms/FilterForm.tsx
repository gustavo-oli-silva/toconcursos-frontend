'use client'

import { QuestaoService } from "@/lib/services/questao/QuestaoService";
import { Filtro } from "@/types/questao/Filtro";
import { useEffect, useState } from "react";
import { Dropdown } from "@/components/project/Dropdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, X } from "lucide-react";
import { IQuestao } from "@/types/questao/IQuestao";

interface FiltrosAplicados {
    palavraChave?: string;
    disciplina?: Option;
    orgao?: Option;
    instituicao?: Option;
    banca?: Option;
}

interface FilterFormProps {
    onFilter?: (questoes: IQuestao[]) => void;
    onClear?: () => void;
}

export default function FilterForm({ onFilter, onClear }: FilterFormProps) {
    const [filtros, setFiltros] = useState<Filtro | null>(null);
    const [palavraChave, setPalavraChave] = useState<string>('');
    const [disciplina, setDisciplina] = useState<Option | null>(null);
    const [orgao, setOrgao] = useState<Option | null>(null);
    const [instituicao, setInstituicao] = useState<Option | null>(null);
    const [banca, setBanca] = useState<Option | null>(null);
    const [filtrosAplicados, setFiltrosAplicados] = useState<FiltrosAplicados>({});
    const [loading, setLoading] = useState<boolean>(false);

    const loadFiltros = async () => {
        try {
            const filtros = await QuestaoService.getFiltros();
            setFiltros(filtros);
        } catch (error) {
            console.error("Erro ao carregar filtros:", error);
        }
    }

    useEffect(() => {
        loadFiltros();
    }, []);

    const handleFiltrar = async () => {
        setLoading(true);
        try {
            const novosFiltros: FiltrosAplicados = {};
            if (palavraChave) novosFiltros.palavraChave = palavraChave;
            if (disciplina) novosFiltros.disciplina = disciplina;
            if (orgao) novosFiltros.orgao = orgao;
            if (instituicao) novosFiltros.instituicao = instituicao;
            if (banca) novosFiltros.banca = banca;
            setFiltrosAplicados(novosFiltros);

            // Preparar payload para o backend
            const filtroPayload = {
                id_disciplina: disciplina?.id,
                id_banca: banca?.id,
                id_orgao: orgao?.id,
                id_instituicao: instituicao?.id,
                palavra_chave: palavraChave,
                skip: 0,
                limit: 100, // Ajustar conforme necessário
            };

            // Chamar o serviço de filtro
            const questoesFiltradas = await QuestaoService.aplicarFiltros(filtroPayload);
            
            // Chamar o callback com as questões filtradas
            if (onFilter) {
                onFilter(questoesFiltradas);
            }
        } catch (error) {
            console.error("Erro ao aplicar filtros:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLimpar = async () => {
        setPalavraChave('');
        setDisciplina(null);
        setOrgao(null);
        setInstituicao(null);
        setBanca(null);
        setFiltrosAplicados({});
        
        // Se houver callback de limpeza, chamar
        if (onClear) {
            onClear();
        }
    };

    const removerFiltro = (tipo: keyof FiltrosAplicados) => {
        switch (tipo) {
            case 'palavraChave':
                setPalavraChave('');
                break;
            case 'disciplina':
                setDisciplina(null);
                break;
            case 'orgao':
                setOrgao(null);
                break;
            case 'instituicao':
                setInstituicao(null);
                break;
            case 'banca':
                setBanca(null);
                break;
        }
        const novosFiltros = { ...filtrosAplicados };
        delete novosFiltros[tipo];
        setFiltrosAplicados(novosFiltros);
    };

    return (
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-500/10 p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30"></div>
            <div className="relative space-y-6">
                {/* Título da seção */}
                <div className="pb-2 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-800">Filtros de Busca</h2>
                    <p className="text-sm text-slate-500 mt-1">Selecione os critérios para filtrar as questões</p>
                </div>

                {/* Grid de filtros - reorganizado para melhor aproveitamento do espaço */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Palavra Chave com botão de busca - ocupa 2 colunas em telas grandes */}
                    <div className="md:col-span-2 lg:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-slate-700">Palavra Chave</label>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={palavraChave}
                                onChange={(e) => setPalavraChave(e.target.value)}
                                placeholder="Digite uma palavra chave"
                                className="flex-1 h-10 px-4 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            <Button
                                onClick={handleFiltrar}
                                disabled={loading}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 rounded-lg shadow-md hover:shadow-lg transition-all h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Search className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Disciplina */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Disciplina</label>
                        <Dropdown
                            label="Disciplina"
                            options={filtros?.disciplinas || []}
                            selectedOption={disciplina}
                            onOptionSelect={setDisciplina}
                            placeholder="Selecione a Disciplina"
                        />
                    </div>

                    {/* Órgão */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Órgão</label>
                        <Dropdown
                            label="Órgão"
                            options={filtros?.orgaos || []}
                            selectedOption={orgao}
                            onOptionSelect={setOrgao}
                            placeholder="Selecione o Órgão"
                        />
                    </div>

                    {/* Instituição */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Instituição</label>
                        <Dropdown
                            label="Instituição"
                            options={filtros?.instituicoes || []}
                            selectedOption={instituicao}
                            onOptionSelect={setInstituicao}
                            placeholder="Selecione a Instituição"
                        />
                    </div>
                </div>

                {/* Segunda linha - Banca */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="md:col-span-1 lg:col-span-1 space-y-2">
                        <label className="text-sm font-medium text-slate-700">Banca</label>
                        <Dropdown
                            label="Banca"
                            options={filtros?.bancas || []}
                            selectedOption={banca}
                            onOptionSelect={setBanca}
                            placeholder="Selecione a Banca"
                        />
                    </div>
                    {/* Espaço vazio para manter o alinhamento */}
                    <div className="hidden lg:block md:col-span-1 lg:col-span-4"></div>
                </div>

                {/* Rodapé com filtros aplicados e botões */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t border-slate-200">
                    {/* Filtros aplicados */}
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-medium text-slate-600">Filtrar por:</p>
                        <div className="flex flex-wrap gap-2 min-h-[32px]">
                            {Object.keys(filtrosAplicados).length === 0 ? (
                                <span className="text-sm text-slate-400 italic">
                                    Os seus filtros aparecerão aqui.
                                </span>
                            ) : (
                                Object.entries(filtrosAplicados).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700"
                                    >
                                        <span className="font-medium">
                                            {key === 'palavraChave' ? 'Palavra Chave' :
                                             key === 'disciplina' ? 'Disciplina' :
                                             key === 'orgao' ? 'Órgão' :
                                             key === 'instituicao' ? 'Instituição' :
                                             key === 'banca' ? 'Banca' : ''}: {typeof value === 'string' ? value : value.label}
                                        </span>
                                        <button
                                            onClick={() => removerFiltro(key as keyof FiltrosAplicados)}
                                            className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Botões de ação */}
                    <div className="flex gap-3">
                        <Button
                            onClick={handleLimpar}
                            variant="outline"
                            className="flex items-center gap-2 bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Limpar
                        </Button>
                        <Button
                            onClick={handleFiltrar}
                            disabled={loading}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? 'Filtrando...' : 'Filtrar'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}