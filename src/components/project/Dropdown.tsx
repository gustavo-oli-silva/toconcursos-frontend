"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, X } from "lucide-react"

interface DropdownProps {
    label: string
    options: Option[]
    selectedOption: Option | null
    onOptionSelect: (option: Option | null) => void
    placeholder?: string
}

export function Dropdown({
    label,
    options,
    selectedOption,
    onOptionSelect,
    placeholder = "Selecione uma opção",
}: DropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="inline-flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-700 bg-white 
                border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[44px]"
                >
                    <span className={selectedOption ? "text-slate-900" : "text-slate-500"}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-[200px] p-1">
                <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-slate-600 uppercase tracking-wide flex justify-center bg-slate-50">
                    {label}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-slate-100 my-1" />

                {selectedOption && (
                    <>
                        <DropdownMenuItem
                            onClick={() => onOptionSelect(null)}
                            className="mx-1 px-3 py-2 flex items-center justify-center gap-2 transition-all duration-150 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-md cursor-pointer"
                        >
                            <X className="w-3 h-3" />
                            Limpar seleção
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="border-slate-100 my-1" />
                    </>
                )}

                {options.map((item) => (
                    <DropdownMenuItem
                        key={item.value}
                        onClick={() => {
                            onOptionSelect(item)
                        }}
                        className={`mx-1 px-3 py-2 flex justify-center transition-all duration-150 hover:bg-blue-50 text-slate-600 hover:text-blue-700 rounded-md cursor-pointer ${selectedOption?.value === item.value ? "bg-blue-100 text-blue-800 font-medium" : ""
                            }`}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
