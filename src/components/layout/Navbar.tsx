import Link from "next/link"
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/actions/auth"

export default async function Navbar() {
    const session = await auth()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <div className="h-6 w-6 bg-primary rounded-md flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xs">CV</span>
                    </div>
                    <span className="font-bold hidden sm:inline-block">CV Builder</span>
                </Link>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search or other items */}
                    </div>
                    <nav className="flex items-center space-x-2">
                        {session?.user ? (
                            <>
                                <Link href="/dashboard">
                                    <Button variant="ghost" size="sm">Dashboard</Button>
                                </Link>
                                <form action={logout}>
                                    <Button variant="outline" size="sm">Sign Out</Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">Login</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}
