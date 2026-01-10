import { createContext, useContext, useState, useEffect } from 'react'

const CVContext = createContext()

export const useCV = () => {
  const context = useContext(CVContext)
  if (!context) {
    throw new Error('useCV must be used within a CVProvider')
  }
  return context
}

export const CVProvider = ({ children }) => {
  const defaultCV = {
    name: '',
    title: '',
    contact: '',
    summary: '',
    education: [],
    experience: [],
    skills: [],
    links: {
      linkedin: { enabled: false, url: '' },
      github: { enabled: false, url: '' },
      instagram: { enabled: false, url: '' },
      website: { enabled: false, url: '' }
    },
  }

  const [cv, setCv] = useState(defaultCV)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cv-draft')
    if (saved) {
      try {
        const savedCV = JSON.parse(saved)
        // Merge saved data with defaults to ensure all fields exist
        setCv({
          ...defaultCV,
          ...savedCV,
          links: {
            ...defaultCV.links,
            ...(savedCV.links || {})
          }
        })
      } catch (error) {
        console.error('Failed to load saved CV:', error)
        setCv(defaultCV)
      }
    }
  }, [])

  // Save to localStorage whenever cv changes
  useEffect(() => {
    localStorage.setItem('cv-draft', JSON.stringify(cv))
  }, [cv])

  const updateField = (field, value) => {
    setCv(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const loadDraft = (draft) => {
    setCv(draft)
  }

  const reset = () => {
    setCv({
      name: '',
      title: '',
      contact: '',
      summary: '',
      education: [],
      experience: [],
      skills: [],
      links: {
        linkedin: { enabled: false, url: '' },
        github: { enabled: false, url: '' },
        instagram: { enabled: false, url: '' },
        website: { enabled: false, url: '' }
      },
    })
  }

  return (
    <CVContext.Provider value={{
      cv,
      updateField,
      loadDraft,
      reset
    }}>
      {children}
    </CVContext.Provider>
  )
}
