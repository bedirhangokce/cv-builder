'use server'

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function createCV() {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const cv = await db.cV.create({
        data: {
            userId: session.user.id,
            title: "Untitled Resume",
            data: JSON.stringify({
                personalDetails: {},
                professionalSummary: "",
                experience: [],
                education: [],
                skills: []
            })
        }
    })

    redirect(`/editor/${cv.id}`)
}

export async function getUserCVs() {
    const session = await auth()
    if (!session?.user?.id) return []

    return await db.cV.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })
}

export async function deleteCV(id: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    await db.cV.delete({
        where: {
            id,
            userId: session.user.id
        }
    })

    revalidatePath('/dashboard')
}

export async function updateCV(id: string, data: any, title?: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    await db.cV.update({
        where: {
            id,
            userId: session.user.id
        },
        data: {
            // Update title if present in data, otherwise ignore. Using separate arg is better but let's extract it from data if we move title there, or just add an arg. 
            // Let's modify the signature to accept title optionally or part of data? 
            // The current usage sends the whole data object. 
            // Let's change signature to: updateCV(id: string, data: any, title?: string)
            data: JSON.stringify(data),
            ...(title && { title })
        }
    })

    revalidatePath(`/editor/${id}`)
    revalidatePath('/dashboard')
}
