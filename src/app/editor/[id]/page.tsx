import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Editor from "@/components/editor/Editor"
import { CVData, initialCVData } from "@/components/editor/types"

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth()
    if (!session?.user?.id) redirect('/login')

    const cv = await db.cV.findUnique({
        where: { id, userId: session.user.id }
    })

    if (!cv) redirect('/dashboard')

    let parsedData: CVData;
    try {
        const rawData = JSON.parse(cv.data)
        // Robust merge: top level + nested objects
        parsedData = {
            ...initialCVData,
            ...rawData,
            theme: { ...initialCVData.theme, ...(rawData.theme || {}) },
            links: { ...initialCVData.links, ...(rawData.links || {}) },
            customSections: rawData.customSections || []
        }
    } catch {
        parsedData = initialCVData
    }

    return <Editor cvId={cv.id} initialData={parsedData} title={cv.title} />
}
