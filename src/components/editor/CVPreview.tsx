'use client'

import { CVData } from "./types"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useState } from "react"

interface CVPreviewProps {
    data: CVData
}

import { Linkedin, Github, Globe, Instagram } from "lucide-react"

export function CVPreview({ data }: CVPreviewProps) {
    const [isExporting, setIsExporting] = useState(false)
    const primaryColor = data.theme?.primaryColor || "#1f2937"
    const fontFamily = data.theme?.fontFamily || "Inter"

    const handleDownload = async () => {
        setIsExporting(true)
        try {
            const html2pdfModule = await import('html2pdf.js')
            const html2pdf = html2pdfModule.default || html2pdfModule

            const element = document.getElementById('cv-preview-content')
            if (!element) throw new Error("Content element not found")

            const opt = {
                margin: 0,
                filename: `${data.name || 'resume'}.pdf`,
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    scrollX: 0,
                    scrollY: 0
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            }
            await html2pdf().set(opt).from(element).save()
        } catch (error) {
            console.error('Export failed:', error)
            alert(`PDF Export failed: ${error instanceof Error ? error.message : String(error)}`)
        } finally {
            setIsExporting(false)
        }
    }

    const SocialIcon = ({ type }: { type: string }) => {
        switch (type) {
            case 'linkedin': return <Linkedin className="w-5 h-5" />
            case 'github': return <Github className="w-5 h-5" />
            case 'website': return <Globe className="w-5 h-5" />
            case 'instagram': return <Instagram className="w-5 h-5" />
            default: return null
        }
    }

    return (
        <div className="h-full flex flex-col">
            {/* Inject Google Fonts */}
            <link
                href={`https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Playfair+Display:wght@400;700&family=Roboto+Mono:wght@400;700&family=Outfit:wght@400;700&display=swap`}
                rel="stylesheet"
            />

            <div className="flex justify-end mb-4 px-4">
                <Button onClick={handleDownload} disabled={isExporting}>
                    {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                    Download PDF
                </Button>
            </div>

            <div className="flex-1 bg-gray-100 overflow-auto p-4 md:p-8 flex justify-center">
                <div
                    id="cv-preview-content"
                    className="bg-white w-[210mm] h-auto p-[10mm] md:p-[20mm] text-black mx-auto shadow-none"
                    style={{
                        boxSizing: 'border-box',
                        fontFamily: fontFamily.replace(/[']/g, '') === 'Inter' ? 'Inter, sans-serif' : fontFamily
                    }}
                >
                    {/* Classic Template */}
                    <div className="space-y-4">
                        <div className="text-center border-b-2 border-[#d1d5db] pb-4 mb-4">
                            <h1 className="text-3xl font-bold uppercase" style={{ color: primaryColor }}>{data.name || 'Your Name'}</h1>
                            <p className="text-xl text-[#4b5563] mt-1">{data.title || 'Job Title'}</p>
                            <p className="text-[#4b5563] mt-2 text-sm">{data.contact || 'Contact Info'}</p>

                            {/* Social Links */}
                            <div className="flex justify-center gap-6 mt-3">
                                {Object.entries(data.links || {}).map(([key, link]) => (
                                    link.enabled && link.url && (
                                        <a
                                            key={key}
                                            href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#4b5563] hover:text-[#1f2937] transition-colors"
                                            style={{ color: primaryColor }}
                                        >
                                            <SocialIcon type={key} />
                                        </a>
                                    )
                                ))}
                            </div>
                        </div>

                        {data.summary && (
                            <div className="mb-4">
                                <h2 className="text-lg font-bold uppercase" style={{ color: primaryColor }}>Professional Summary</h2>
                                <div className="h-0.5 w-full mt-1 mb-2" style={{ backgroundColor: `${primaryColor}22` }} />
                                <p className="text-[#374151] text-sm leading-relaxed">{data.summary}</p>
                            </div>
                        )}

                        {data.experience.length > 0 && (
                            <div className="mb-4">
                                <h2 className="text-lg font-bold uppercase" style={{ color: primaryColor }}>Experience</h2>
                                <div className="h-0.5 w-full mt-1 mb-2" style={{ backgroundColor: `${primaryColor}22` }} />
                                <div className="space-y-3">
                                    {data.experience.map((exp) => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold" style={{ color: primaryColor }}>{exp.jobTitle}</h3>
                                                <span className="text-sm text-[#4b5563] italic">
                                                    {exp.startDate} - {exp.endDate || 'Present'}
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold text-[#374151]">{exp.company}</p>
                                            <p className="text-sm text-[#4b5563] mt-1 whitespace-pre-wrap">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.education.length > 0 && (
                            <div className="mb-4">
                                <h2 className="text-lg font-bold uppercase" style={{ color: primaryColor }}>Education</h2>
                                <div className="h-0.5 w-full mt-1 mb-2" style={{ backgroundColor: `${primaryColor}22` }} />
                                <div className="space-y-3">
                                    {data.education.map((edu) => (
                                        <div key={edu.id}>
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="font-bold" style={{ color: primaryColor }}>{edu.school}</h3>
                                                <span className="text-sm text-[#4b5563]">{edu.graduationYear}</span>
                                            </div>
                                            <p className="text-sm text-[#374151]">{edu.degree} in {edu.field}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.skills.length > 0 && (
                            <div className="mb-4">
                                <h2 className="text-lg font-bold uppercase" style={{ color: primaryColor }}>Skills</h2>
                                <div className="h-0.5 w-full mt-1 mb-2" style={{ backgroundColor: `${primaryColor}22` }} />
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="px-2 py-1 rounded text-sm print:border"
                                            style={{
                                                backgroundColor: `${primaryColor}11`,
                                                color: primaryColor,
                                                borderColor: `${primaryColor}33`
                                            }}
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.customSections?.map((section) => (
                            <div key={section.id} className="mb-4">
                                <h2 className="text-lg font-bold uppercase" style={{ color: primaryColor }}>{section.title}</h2>
                                <div className="h-0.5 w-full mt-1 mb-2" style={{ backgroundColor: `${primaryColor}22` }} />
                                <p className="text-[#374151] text-sm leading-relaxed whitespace-pre-wrap">{section.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
