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
  const [cv, setCv] = useState({
    name: '',
    title: '',
    contact: '',
    summary: '',
    education: [],
    experience: [],
    skills: []
  })

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cv-draft')
    if (saved) {
      try {
        setCv(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load saved CV:', error)
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
      skills: []
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
