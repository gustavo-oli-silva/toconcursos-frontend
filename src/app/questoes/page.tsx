import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function QuestoesScreen() {
    return (
        <div>
            <main>
                <header className="flex flex-row justify-center items-center gap gap-x-20 rounded-lg">
                    <h1 className="scroll-m-20 pb-2 text-4xl font-semibold first:mt-0">
                        Minhas Questões
                    </h1>
                    <Button>Fechar Filtros</Button>
                </header>

                <section className="border mt-10">
                    <div className="flex flex-row justify-center items-center gap gap-x-5">
                        <Button>Todas</Button>
                        <Button>Resolvidas</Button>
                        <Button>Não Resolvidas</Button>
                        <Button>Acertei</Button>
                        <Button>Errei</Button>
                    </div>

                    <div className="grid grid-cols-3 grid-rows-3 gap-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger>Disciplina</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    Selecione a disciplina
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator></DropdownMenuSeparator>
                                <DropdownMenuItem>
                                    Matemática
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </section>
            </main>
        </div>
    )
}