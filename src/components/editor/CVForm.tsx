'use client'

import { CVData, Education, Experience, Skill } from "./types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Textarea import removed, using native element or need to add component. 
// Using native element as per code below.
// I'll use standard textarea or install it. I'll stick to standard with basic styling matching input.
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash2 } from "lucide-react"

interface CVFormProps {
    data: CVData
    onChange: (data: CVData) => void
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, FileText, Globe, Linkedin, Github, Instagram } from "lucide-react"

export function CVForm({ data, onChange }: CVFormProps) {
    const updateField = (field: keyof CVData, value: any) => {
        onChange({ ...data, [field]: value })
    }

    const updateTheme = (field: string, value: any) => {
        onChange({ ...data, theme: { ...data.theme, [field]: value } })
    }

    const updateLink = (key: string, field: 'url' | 'enabled', value: any) => {
        onChange({
            ...data,
            links: {
                ...data.links,
                [key]: { ...data.links[key], [field]: value }
            }
        })
    }

    const updateNestedField = (section: 'education' | 'experience' | 'skills' | 'customSections', index: number, field: string, value: any) => {
        const newData = { ...data }
        // @ts-ignore
        newData[section][index] = { ...newData[section][index], [field]: value }
        onChange(newData)
    }

    const addItem = (section: 'education' | 'experience' | 'skills' | 'customSections') => {
        const newData = { ...data }
        const id = Date.now().toString()
        if (section === 'education') {
            newData.education.push({ id, degree: '', field: '', school: '', graduationYear: '', description: '' })
        } else if (section === 'experience') {
            newData.experience.push({ id, jobTitle: '', company: '', startDate: '', endDate: '', description: '' })
        } else if (section === 'skills') {
            newData.skills.push({ id, name: '', level: 3 })
        } else if (section === 'customSections') {
            newData.customSections.push({ id, title: 'New Section', content: '' })
        }
        onChange(newData)
    }

    const removeItem = (section: 'education' | 'experience' | 'skills' | 'customSections', index: number) => {
        const newData = { ...data }
        newData[section].splice(index, 1)
        onChange(newData)
    }

    return (
        <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="content" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Content
                </TabsTrigger>
                <TabsTrigger value="design" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" /> Design
                </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6 mt-0">
                <Accordion type="single" collapsible defaultValue="personal" className="w-full">
                    <AccordionItem value="personal">
                        <AccordionTrigger>Personal Details</AccordionTrigger>
                        <AccordionContent className="space-y-4 p-1">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" value={data.name || ''} onChange={(e) => updateField('name', e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Job Title</Label>
                                        <Input id="title" value={data.title || ''} onChange={(e) => updateField('title', e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="contact">Contact Info</Label>
                                    <Input id="contact" value={data.contact || ''} onChange={(e) => updateField('contact', e.target.value)} placeholder="Email | Phone | Location" />
                                </div>

                                <div className="space-y-3">
                                    <Label>Social Links</Label>
                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-2">
                                            <Linkedin className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="LinkedIn URL"
                                                value={data.links.linkedin?.url || ''}
                                                onChange={(e) => updateLink('linkedin', 'url', e.target.value)}
                                            />
                                            <input
                                                type="checkbox"
                                                checked={data.links.linkedin?.enabled || false}
                                                onChange={(e) => updateLink('linkedin', 'enabled', e.target.checked)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Github className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="GitHub URL"
                                                value={data.links.github?.url || ''}
                                                onChange={(e) => updateLink('github', 'url', e.target.value)}
                                            />
                                            <input
                                                type="checkbox"
                                                checked={data.links.github?.enabled || false}
                                                onChange={(e) => updateLink('github', 'enabled', e.target.checked)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Portfolio/Website URL"
                                                value={data.links.website?.url || ''}
                                                onChange={(e) => updateLink('website', 'url', e.target.value)}
                                            />
                                            <input
                                                type="checkbox"
                                                checked={data.links.website?.enabled || false}
                                                onChange={(e) => updateLink('website', 'enabled', e.target.checked)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="summary">Professional Summary</Label>
                                    <textarea
                                        id="summary"
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={data.summary || ''}
                                        onChange={(e) => updateField('summary', e.target.value)}
                                    />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="experience">
                        <AccordionTrigger>Experience</AccordionTrigger>
                        <AccordionContent className="space-y-4 p-1">
                            {data.experience.map((exp, index) => (
                                <div key={exp.id} className="relative border p-4 rounded-lg space-y-3">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-destructive" onClick={() => removeItem('experience', index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="grid gap-2">
                                            <Label>Job Title</Label>
                                            <Input value={exp.jobTitle} onChange={(e) => updateNestedField('experience', index, 'jobTitle', e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Company</Label>
                                            <Input value={exp.company} onChange={(e) => updateNestedField('experience', index, 'company', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="grid gap-2">
                                            <Label>Start Date</Label>
                                            <Input value={exp.startDate} onChange={(e) => updateNestedField('experience', index, 'startDate', e.target.value)} placeholder="MM/YYYY" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>End Date</Label>
                                            <Input value={exp.endDate} onChange={(e) => updateNestedField('experience', index, 'endDate', e.target.value)} placeholder="Present" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Description</Label>
                                        <textarea
                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            value={exp.description}
                                            onChange={(e) => updateNestedField('experience', index, 'description', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" size="sm" className="w-full" onClick={() => addItem('experience')}>
                                <Plus className="mr-2 h-4 w-4" /> Add Experience
                            </Button>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="education">
                        <AccordionTrigger>Education</AccordionTrigger>
                        <AccordionContent className="space-y-4 p-1">
                            {data.education.map((edu, index) => (
                                <div key={edu.id} className="relative border p-4 rounded-lg space-y-3">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-destructive" onClick={() => removeItem('education', index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="grid gap-2">
                                            <Label>Degree</Label>
                                            <Input value={edu.degree} onChange={(e) => updateNestedField('education', index, 'degree', e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Field</Label>
                                            <Input value={edu.field} onChange={(e) => updateNestedField('education', index, 'field', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="grid gap-2">
                                            <Label>School</Label>
                                            <Input value={edu.school} onChange={(e) => updateNestedField('education', index, 'school', e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Year</Label>
                                            <Input value={edu.graduationYear} onChange={(e) => updateNestedField('education', index, 'graduationYear', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" size="sm" className="w-full" onClick={() => addItem('education')}>
                                <Plus className="mr-2 h-4 w-4" /> Add Education
                            </Button>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="skills">
                        <AccordionTrigger>Skills</AccordionTrigger>
                        <AccordionContent className="space-y-4 p-1">
                            <div className="space-y-2">
                                {data.skills.map((skill, index) => (
                                    <div key={skill.id} className="flex items-center gap-2">
                                        <Input
                                            value={skill.name}
                                            onChange={(e) => updateNestedField('skills', index, 'name', e.target.value)}
                                            placeholder="Skill Name"
                                            className="flex-1"
                                        />
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeItem('skills', index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" className="w-full" onClick={() => addItem('skills')}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Skill
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="custom">
                        <AccordionTrigger>Custom Sections</AccordionTrigger>
                        <AccordionContent className="space-y-4 p-1">
                            {data.customSections?.map((section, index) => (
                                <div key={section.id} className="relative border p-4 rounded-lg space-y-3">
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-destructive" onClick={() => removeItem('customSections', index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <div className="grid gap-2">
                                        <Label>Section Title</Label>
                                        <Input value={section.title} onChange={(e) => updateNestedField('customSections', index, 'title', e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Content</Label>
                                        <textarea
                                            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            value={section.content}
                                            onChange={(e) => updateNestedField('customSections', index, 'content', e.target.value)}
                                            placeholder="Text, bullet points, etc."
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" size="sm" className="w-full" onClick={() => addItem('customSections')}>
                                <Plus className="mr-2 h-4 w-4" /> Add Custom Section
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </TabsContent>

            <TabsContent value="design" className="space-y-6 mt-0">
                <div className="space-y-6 p-1">
                    <div className="space-y-3">
                        <Label>Primary Color</Label>
                        <div className="flex flex-wrap gap-2">
                            {['#1f2937', '#2563eb', '#dc2626', '#16a34a', '#7c3aed', '#db2777'].map((color) => (
                                <button
                                    key={color}
                                    className={`h-8 w-8 rounded-full border-2 ${data.theme?.primaryColor === color ? 'border-primary' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => updateTheme('primaryColor', color)}
                                />
                            ))}
                            <Input
                                type="color"
                                className="h-8 w-12 p-0 border-none bg-transparent cursor-pointer"
                                value={data.theme?.primaryColor || '#1f2937'}
                                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Font Family</Label>
                        <select
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            value={data.theme?.fontFamily || 'Inter'}
                            onChange={(e) => updateTheme('fontFamily', e.target.value)}
                        >
                            <option value="Inter">Sans-Serif (Default)</option>
                            <option value="'Playfair Display', serif">Serif (Elegant)</option>
                            <option value="'Roboto Mono', monospace">Monospace (Tech)</option>
                            <option value="'Outfit', sans-serif">Modern (Rounded)</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <Label>Template Layout</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant={data.theme?.layout === 'classic' ? 'default' : 'outline'}
                                className="w-full"
                                onClick={() => updateTheme('layout', 'classic')}
                            >
                                Classic
                            </Button>
                            <Button
                                variant={data.theme?.layout === 'sidebar' ? 'default' : 'outline'}
                                className="w-full"
                                onClick={() => updateTheme('layout', 'sidebar')}
                                disabled // Will implement later
                            >
                                Sidebar (Soon)
                            </Button>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}
