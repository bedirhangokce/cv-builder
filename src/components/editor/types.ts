export interface CVLink {
    url: string
    enabled: boolean
}

export interface Education {
    id: string
    degree: string
    field: string
    school: string
    graduationYear: string
    description: string
}

export interface Experience {
    id: string
    jobTitle: string
    company: string
    startDate: string
    endDate: string
    description: string
}

export interface Skill {
    id: string
    name: string
    level: number
}

export interface CustomSection {
    id: string
    title: string
    content: string
}

export interface CVData {
    name: string
    title: string
    contact: string
    summary: string
    links: Record<string, CVLink>
    education: Education[]
    experience: Experience[]
    skills: Skill[]
    customSections: CustomSection[]
    theme: {
        primaryColor: string
        fontFamily: string
        layout: 'classic' | 'sidebar' | 'modern'
    }
}

export const initialCVData: CVData = {
    name: "",
    title: "",
    contact: "",
    summary: "",
    links: {
        linkedin: { url: "", enabled: false },
        github: { url: "", enabled: false },
        website: { url: "", enabled: false },
        instagram: { url: "", enabled: false },
    },
    education: [],
    experience: [],
    skills: [],
    customSections: [],
    theme: {
        primaryColor: "#1f2937",
        fontFamily: "Inter",
        layout: "classic"
    }
}
