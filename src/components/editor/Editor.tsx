'use client'

import { useState } from "react"
import { CVData } from "./types"
import { CVForm } from "./CVForm"
import { CVPreview } from "./CVPreview"
import { useDebouncedCallback } from "use-debounce"
import { updateCV } from "@/app/actions/cv"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"

interface EditorProps {
    cvId: string
    initialData: CVData
    title: string
}

export default function Editor({ cvId, initialData, title }: EditorProps) {
    const [data, setData] = useState<CVData>(initialData)
    const [isSaving, setIsSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)

    const [cvTitle, setCvTitle] = useState(title)

    const save = async (newData: CVData, newTitle: string) => {
        setIsSaving(true)
        try {
            await updateCV(cvId, newData, newTitle)
            setLastSaved(new Date())
        } catch (error) {
            console.error("Auto-save failed:", error)
        } finally {
            setIsSaving(false)
        }
    }

    const debouncedSave = useDebouncedCallback(save, 1000)

    const handleChange = (newData: CVData) => {
        setData(newData)
        debouncedSave(newData, cvTitle)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value
        setCvTitle(newTitle)
        debouncedSave(data, newTitle)
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-background">
            <header className="border-b px-4 py-3 flex items-center justify-between bg-card z-10 shadow-sm relative">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <input
                            value={cvTitle}
                            onChange={handleTitleChange}
                            className="font-semibold text-sm md:text-base bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-ring rounded px-1"
                            aria-label="Rename Resume"
                        />
                        <p className="text-xs text-muted-foreground">
                            {isSaving ? "Saving..." : lastSaved ? `Saved at ${lastSaved.toLocaleTimeString()}` : "All changes saved"}
                        </p>
                    </div>
                </div>
                <Button disabled={isSaving} onClick={() => {
                    debouncedSave(data, cvTitle)
                    debouncedSave.flush()
                }} size="sm">
                    <Save className="mr-2 h-4 w-4" /> Save
                </Button>
            </header>

            <div className="flex-1 overflow-hidden relative">
                {/* Mobile: Stack */}
                <div className="md:hidden h-full overflow-auto">
                    <div className="p-4">
                        <CVForm data={data} onChange={handleChange} />
                    </div>
                    <div className="h-2 bg-gray-100 border-y py-2 text-center text-xs text-gray-500 font-bold uppercase tracking-widest">Preview Below</div>
                    <div className="h-[800px] bg-slate-100 p-4">
                        <CVPreview data={data} />
                    </div>
                </div>

                {/* Desktop: Split Screen (Flex) */}
                <div className="hidden md:flex h-full">
                    <div className="w-[40%] min-w-[350px] max-w-[50%] h-full overflow-y-auto p-6 bg-slate-50/50 dark:bg-zinc-900/50 scrollbar-thin border-r">
                        <CVForm data={data} onChange={handleChange} />
                    </div>
                    <div className="flex-1 h-full bg-slate-200/50 dark:bg-zinc-950 p-8 flex items-start justify-center overflow-auto">
                        <div className="min-h-full w-full flex justify-center">
                            <CVPreview data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
