import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Plus, FileText, Trash2, Edit } from "lucide-react"
import { createCV, getUserCVs, deleteCV } from "@/app/actions/cv"
import Link from "next/link"

export default async function DashboardPage() {
    const session = await auth()
    if (!session) redirect('/login')

    const cvs = await getUserCVs()

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container py-8 mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Manage your resumes.</p>
                    </div>
                    <form action={createCV}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create New CV
                        </Button>
                    </form>
                </div>

                {cvs.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg border-dashed">
                        <h3 className="text-lg font-semibold">No resumes yet</h3>
                        <p className="text-muted-foreground mb-4">Create your first resume to get started.</p>
                        <form action={createCV}>
                            <Button variant="outline">Create Resume</Button>
                        </form>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {cvs.map((cv: any) => (
                            <Card key={cv.id} className="flex flex-col justify-between">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-xl">
                                                {cv.title}
                                            </CardTitle>
                                            <CardDescription>
                                                Last updated: {new Date(cv.updatedAt).toLocaleDateString()}
                                            </CardDescription>
                                        </div>
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </CardHeader>
                                <CardFooter className="flex justify-end gap-2">
                                    <form action={async () => {
                                        'use server'
                                        await deleteCV(cv.id)
                                    }}>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                    <Link href={`/editor/${cv.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
