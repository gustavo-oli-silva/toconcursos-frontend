"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Evita hidratação mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-indigo-50/80 dark:hover:bg-indigo-950/20"
                aria-label="Alternar tema"
            >
                <Sun className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-indigo-50/80 dark:hover:bg-indigo-950/20 transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Alternar para tema claro" : "Alternar para tema escuro"}
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-slate-300 hover:text-yellow-400 transition-colors" />
            ) : (
                <Moon className="h-5 w-5 text-slate-700 hover:text-indigo-600 transition-colors" />
            )}
        </Button>
    )
}

