import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DisciplinaDropdownProps {
    label: string
    options: Option[];
    selectedOption: Option;
    onOptionSelect: (option: Option) => void;
};

export function Dropdown({
    label,
    options,
    selectedOption,
    onOptionSelect,
}: DisciplinaDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white 
                border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {selectedOption.label}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className='px-4 py-3 text-sm font-semibold text-gray-700 flex justify-center'>
                    {label}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='border-blue-100' />
                {options.map((item) => (
                    <DropdownMenuItem
                        key={item.value}
                        onClick={() => {
                            onOptionSelect(item);
                        }}
                        className='p-2 px-5 flex justify-center transition-all duration-150 hover:bg-gray-200 text-gray-500 hover:text-black'
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}