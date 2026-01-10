import { useContext, useState } from 'react'
import { useCV } from '../context/CVContext'
import TemplateSelector from './TemplateSelector'
import DraftManager from './DraftManager'
import ExportButton from './ExportButton'
import validators from '../utils/validation'

export default function CVEditor({ onTemplateChange }) {
  const { cv, updateField } = useCV()
  const [errors, setErrors] = useState({})

  const updateEducation = (index, updates) => {
    const newEdu = [...cv.education]
    newEdu[index] = { ...newEdu[index], ...updates }
    updateField('education', newEdu)

    // Validate the updated education entry
    const eduError = validators.validateEducation(newEdu[index])
    if (eduError) {
      setErrors(prev => ({ ...prev, [`education_${index}`]: eduError }))
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[`education_${index}`]
        return newErrors
      })
    }
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: '',
      field: '',
      school: '',
      graduationYear: '',
      description: ''
    }
    updateField('education', [...cv.education, newEdu])
  }

  const removeEducation = (index) => {
    updateField('education', cv.education.filter((_, i) => i !== index))
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[`education_${index}`]
      return newErrors
    })
  }

  const updateExperience = (index, updates) => {
    const newExp = [...cv.experience]
    newExp[index] = { ...newExp[index], ...updates }
    updateField('experience', newExp)

    // Validate the updated experience entry
    const expError = validators.validateExperience(newExp[index])
    if (expError) {
      setErrors(prev => ({ ...prev, [`experience_${index}`]: expError }))
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[`experience_${index}`]
        return newErrors
      })
    }
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    }
    updateField('experience', [...cv.experience, newExp])
  }

  const removeExperience = (index) => {
    updateField('experience', cv.experience.filter((_, i) => i !== index))
    // Clear error for this experience entry
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[`experience_${index}`]
      return newErrors
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Editor</h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Fill in your details</span>
      </div>

      <TemplateSelector onTemplateChange={onTemplateChange} />

      <div className="space-y-4">
        <InputField
          label="Full Name"
          value={cv.name}
          onChange={(v) => updateField('name', v)}
          error={errors.name}
          required
        />
        <InputField
          label="Job Title"
          value={cv.title}
          onChange={(v) => updateField('title', v)}
          error={errors.title}
          required
        />
        <InputField
          label="Contact Information"
          value={cv.contact}
          onChange={(v) => updateField('contact', v)}
          error={errors.contact}
          required
        />
        <TextAreaField
          label="Professional Summary"
          value={cv.summary}
          onChange={(v) => updateField('summary', v)}
          error={errors.summary}
        />

        {/* Personal Links Section */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-700 mb-3">Personal Links</h3>
          <div className="space-y-3">
            {[
              {
                key: 'linkedin',
                label: 'LinkedIn',
                placeholder: 'https://linkedin.com/in/your-profile',
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                color: 'text-[#0A66C2]'
              },
              {
                key: 'github',
                label: 'GitHub',
                placeholder: 'https://github.com/your-username',
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
                color: 'text-gray-800'
              },
              {
                key: 'instagram',
                label: 'Instagram',
                placeholder: 'https://instagram.com/your-profile',
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                color: 'text-[#E4405F]'
              },
              {
                key: 'website',
                label: 'Website',
                placeholder: 'https://yourwebsite.com',
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/></svg>,
                color: 'text-emerald-600'
              }
            ].map(({ key, label, placeholder, icon, color }) => (
              <div key={key} className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${cv.links?.[key]?.enabled ? 'bg-white border-indigo-200 shadow-sm' : 'bg-gray-50 border-gray-200'}`}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cv.links?.[key]?.enabled || false}
                    onChange={e => updateField('links', { ...cv.links, [key]: { ...cv.links?.[key], enabled: e.target.checked } })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 relative"></div>
                </label>
                <span className={`${color} ${!cv.links?.[key]?.enabled && 'opacity-40'}`}>{icon}</span>
                <span className={`w-20 font-medium text-sm ${!cv.links?.[key]?.enabled && 'text-gray-400'}`}>{label}</span>
                <input
                  type="url"
                  value={cv.links?.[key]?.url || ''}
                  onChange={e => updateField('links', { ...cv.links, [key]: { ...cv.links?.[key], url: e.target.value } })}
                  placeholder={placeholder}
                  className={`flex-1 px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all ${cv.links?.[key]?.enabled ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-100 text-gray-400'}`}
                  disabled={!cv.links?.[key]?.enabled}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700">Education</h3>
            <button
              onClick={addEducation}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              + Add Education
            </button>
          </div>
          <div className="space-y-4">
            {cv.education.map((edu, idx) => (
              <div key={edu.id} className={`p-3 rounded-lg border ${errors[`education_${idx}`] ? 'bg-red-50 border-red-300' : 'bg-indigo-50 border-indigo-200'}`}>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <InputField
                    label="Degree"
                    value={edu.degree}
                    onChange={(v) => updateEducation(idx, { degree: v })}
                    error={errors[`education_${idx}`]?.degree}
                    required
                  />
                  <InputField
                    label="Field of Study"
                    value={edu.field}
                    onChange={(v) => updateEducation(idx, { field: v })}
                    error={errors[`education_${idx}`]?.field}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <InputField
                    label="School/University"
                    value={edu.school}
                    onChange={(v) => updateEducation(idx, { school: v })}
                    error={errors[`education_${idx}`]?.school}
                    required
                  />
                  <InputField
                    label="Graduation Year"
                    value={edu.graduationYear}
                    onChange={(v) => updateEducation(idx, { graduationYear: v })}
                    placeholder="e.g., 2020"
                    error={errors[`education_${idx}`]?.graduationYear}
                    required
                  />
                </div>
                <TextAreaField
                  label="Details"
                  value={edu.description}
                  onChange={(v) => updateEducation(idx, { description: v })}
                  error={errors[`education_${idx}`]?.description}
                />
                <button
                  onClick={() => removeEducation(idx)}
                  className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700">Experience</h3>
            <button
              onClick={addExperience}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              + Add Experience
            </button>
          </div>
          <div className="space-y-4">
            {cv.experience.map((exp, idx) => (
              <div key={exp.id} className={`p-3 rounded-lg border ${errors[`experience_${idx}`] ? 'bg-red-50 border-red-300' : 'bg-indigo-50 border-indigo-200'}`}>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <InputField
                    label="Job Title"
                    value={exp.jobTitle}
                    onChange={(v) => updateExperience(idx, { jobTitle: v })}
                    error={errors[`experience_${idx}`]?.jobTitle}
                    required
                  />
                  <InputField
                    label="Company"
                    value={exp.company}
                    onChange={(v) => updateExperience(idx, { company: v })}
                    error={errors[`experience_${idx}`]?.company}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <InputField
                    label="Start Date"
                    value={exp.startDate}
                    onChange={(v) => {
                      updateExperience(idx, { startDate: v })
                      const error = validators.validateStartDate(v)
                      if (error) {
                        setErrors(prev => ({ ...prev, [`experience_${idx}`]: { ...prev[`experience_${idx}`], startDate: error } }))
                      } else {
                        setErrors(prev => {
                          const newErrors = { ...prev }
                          if (newErrors[`experience_${idx}`]) {
                            delete newErrors[`experience_${idx}`].startDate
                          }
                          return newErrors
                        })
                      }
                    }}
                    placeholder="e.g., 2021 or 2021-01"
                    error={errors[`experience_${idx}`]?.startDate}
                    required
                  />
                  <InputField
                    label="End Date"
                    value={exp.endDate}
                    onChange={(v) => {
                      updateExperience(idx, { endDate: v })
                      const error = validators.validateEndDate(v)
                      if (error) {
                        setErrors(prev => ({ ...prev, [`experience_${idx}`]: { ...prev[`experience_${idx}`], endDate: error } }))
                      } else {
                        setErrors(prev => {
                          const newErrors = { ...prev }
                          if (newErrors[`experience_${idx}`]) {
                            delete newErrors[`experience_${idx}`].endDate
                          }
                          return newErrors
                        })
                      }
                    }}
                    placeholder="e.g., 2024, Present, or leave empty"
                    error={errors[`experience_${idx}`]?.endDate}
                  />
                </div>
                <TextAreaField
                  label="Description"
                  value={exp.description}
                  onChange={(v) => updateExperience(idx, { description: v })}
                  error={errors[`experience_${idx}`]?.description}
                />
                <button
                  onClick={() => removeExperience(idx)}
                  className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-700">Skills</h3>
          <div className="space-y-4">
            <SkillsField
              skills={cv.skills}
              onChange={(skills) => updateField('skills', skills)}
              error={errors.skills}
            />
          </div>
        </div>
      </div>

      <DraftManager />
      <ExportButton />
    </div>
  )
}

function InputField({ label, value, onChange, placeholder, error, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500 bg-red-50'
            : 'border-gray-300 focus:ring-indigo-500'
        }`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  )
}

function TextAreaField({ label, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows="3"
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500 bg-red-50'
            : 'border-gray-300 focus:ring-indigo-500'
        }`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  )
}

function SkillsField({ label, skills, onChange, error }) {
  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    onChange(newSkills)
  }

  const addSkill = () => {
    onChange([...skills, { id: Date.now(), name: '', level: 3 }])
  }

  const removeSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="space-y-3">
        {skills.map((skill, idx) => (
          <div key={skill.id} className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={skill.name || ''}
                onChange={(e) => handleSkillChange(idx, 'name', e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                placeholder="Skill name"
              />
              <div className="flex gap-1">
                {['1', '2', '3', '4', '5'].map((levelName, level) => (
                  <button
                    key={level}
                    onClick={() => handleSkillChange(idx, 'level', level + 1)}
                    className={`w-6 h-6 rounded-full font-semibold text-xs transition-all duration-200 flex items-center justify-center ${
                      (skill.level || 3) === level + 1
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white border border-indigo-300 text-indigo-700 hover:border-indigo-500'
                    }`}
                  >
                    {levelName}
                  </button>
                ))}
              </div>
              <button
                onClick={() => removeSkill(idx)}
                className="px-2 py-1 text-red-600 hover:bg-red-50 rounded-md transition font-medium text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addSkill}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          + Add Skill
        </button>
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  )
}
