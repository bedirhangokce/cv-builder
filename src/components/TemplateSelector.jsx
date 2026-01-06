import { useState } from 'react'
import { useCV } from '../context/CVContext'

export default function TemplateSelector({ onTemplateChange }) {
  const { cv, updateField } = useCV()
  const [selectedTemplate, setSelectedTemplate] = useState('classic')

  const templates = [
    { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
    { id: 'modern', name: 'Modern', description: 'Contemporary design with colors' },
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple design' }
  ]

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    if (onTemplateChange) {
      onTemplateChange(templateId)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedTemplate === template.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-medium text-gray-800">{template.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}