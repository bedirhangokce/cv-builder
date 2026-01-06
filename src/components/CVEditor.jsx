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
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Editor</h2>
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

        <SkillsField
          label="Skills"
          skills={cv.skills}
          onChange={(skills) => updateField('skills', skills)}
          error={errors.skills}
        />
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
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
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
