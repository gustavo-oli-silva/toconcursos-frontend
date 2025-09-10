export function AppHeader() {
    return (
        <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/60 shadow-lg backdrop-blur-sm">
            <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 md:py-5">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                        TOconcursos
                    </h1>
                    <ul className="hidden md:flex items-center gap-1 lg:gap-2">
                        <li>
                            <span className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                Início
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </span>
                        </li>
                        <li>
                            <span className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                Concursos
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </span>
                        </li>
                        <li>
                            <span className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                Questões
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </span>
                        </li>
                        <li>
                            <span className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                Simulados
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </span>
                        </li>
                        <li>
                            <span className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                Planos
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </span>
                        </li>
                        <li>
                            <span className="ml-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-[1.02]">
                                Contato
                            </span>
                        </li>
                    </ul>
                    <div className="md:hidden">
                        <button className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
