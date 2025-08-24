export function AppHeader() {
    return (
        <div className="bg-white border-b border-white/20 shadow-xl">
            <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 md:py-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent drop-shadow-sm">
                        TOconcursos
                    </h1>
                    <ul className="flex flex-wrap items-center gap-2 md:gap-4 lg:gap-6">
                        <li>
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                Inicio
                            </span>
                        </li>
                        <li>
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                Concursos
                            </span>
                        </li>
                        <li>
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                Questões
                            </span>
                        </li>
                        <li>
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                Simulados
                            </span>
                        </li>
                        <li>
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                Planos
                            </span>
                        </li>
                        <li>
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                Contato
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}