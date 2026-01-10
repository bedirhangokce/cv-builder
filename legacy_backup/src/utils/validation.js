const validators = {
  // Basic string validation
  isValidString: (value) => {
    return typeof value === 'string' && value.trim().length > 0
  },

  // Name validation
  validateName: (name) => {
    if (!validators.isValidString(name)) {
      return 'Name is required'
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long'
    }
    return null
  },

  // Title validation
  validateTitle: (title) => {
    if (!validators.isValidString(title)) {
      return 'Job title is required'
    }
    if (title.trim().length < 2) {
      return 'Job title must be at least 2 characters long'
    }
    return null
  },

  // Contact validation
  validateContact: (contact) => {
    if (!validators.isValidString(contact)) {
      return 'Contact information is required'
    }
    return null
  },

  // Summary validation
  validateSummary: (summary) => {
    if (summary && summary.trim().length > 500) {
      return 'Summary must be less than 500 characters'
    }
    return null
  },

  // Education validation
  validateEducation: (education) => {
    const errors = {}

    if (!validators.isValidString(education.degree)) {
      errors.degree = 'Degree is required'
    }

    if (!validators.isValidString(education.field)) {
      errors.field = 'Field of study is required'
    }

    if (!validators.isValidString(education.school)) {
      errors.school = 'School/University is required'
    }

    if (!validators.isValidString(education.graduationYear)) {
      errors.graduationYear = 'Graduation year is required'
    } else if (!/^\d{4}$/.test(education.graduationYear.trim())) {
      errors.graduationYear = 'Graduation year must be a valid 4-digit year'
    }

    return Object.keys(errors).length === 0 ? null : errors
  },

  // Experience validation
  validateExperience: (experience) => {
    const errors = {}

    if (!validators.isValidString(experience.jobTitle)) {
      errors.jobTitle = 'Job title is required'
    }

    if (!validators.isValidString(experience.company)) {
      errors.company = 'Company is required'
    }

    if (!validators.isValidString(experience.startDate)) {
      errors.startDate = 'Start date is required'
    } else if (!validators.isValidDate(experience.startDate)) {
      errors.startDate = 'Start date must be in YYYY or YYYY-MM format'
    }

    if (experience.endDate && !validators.isValidDate(experience.endDate)) {
      errors.endDate = 'End date must be in YYYY or YYYY-MM format, or leave empty for current position'
    }

    return Object.keys(errors).length === 0 ? null : errors
  },

  // Date validation
  isValidDate: (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return false

    const trimmed = dateStr.trim()

    // Check YYYY format
    if (/^\d{4}$/.test(trimmed)) {
      const year = parseInt(trimmed, 10)
      return year >= 1900 && year <= new Date().getFullYear() + 10
    }

    // Check YYYY-MM format
    if (/^\d{4}-\d{2}$/.test(trimmed)) {
      const [year, month] = trimmed.split('-').map(n => parseInt(n, 10))
      return year >= 1900 && year <= new Date().getFullYear() + 10 &&
             month >= 1 && month <= 12
    }

    return false
  },

  // Start date validation
  validateStartDate: (startDate) => {
    if (!validators.isValidString(startDate)) {
      return 'Start date is required'
    }
    if (!validators.isValidDate(startDate)) {
      return 'Start date must be in YYYY or YYYY-MM format'
    }
    return null
  },

  // End date validation
  validateEndDate: (endDate) => {
    if (endDate && !validators.isValidDate(endDate)) {
      return 'End date must be in YYYY or YYYY-MM format, or leave empty for current position'
    }
    return null
  },

  // Skills validation
  validateSkills: (skills) => {
    if (!Array.isArray(skills)) {
      return 'Skills must be a list'
    }

    const validSkills = skills.filter(skill =>
      skill && typeof skill === 'object' &&
      validators.isValidString(skill.name)
    )

    if (validSkills.length === 0 && skills.length > 0) {
      return 'At least one valid skill is required'
    }

    return null
  },

  // Custom field validation
  validateCustomField: (field) => {
    const errors = {}

    if (!validators.isValidString(field.type)) {
      errors.type = 'Field type is required'
    }

    if (!validators.isValidString(field.label)) {
      errors.label = 'Field label is required'
    }

    if (field.type === 'text' && !validators.isValidString(field.value)) {
      errors.value = 'Text value is required'
    }

    if (field.type === 'skills') {
      if (Array.isArray(field.value)) {
        const invalidSkills = field.value.filter(skill => !validators.isValidString(skill))
        if (invalidSkills.length > 0) {
          errors.value = 'All skills must have valid text'
        }
      }
    }

    return Object.keys(errors).length === 0 ? null : errors
  },

  // Validate all experience entries
  validateAllExperience: (experiences) => {
    if (!Array.isArray(experiences)) return null

    const errors = {}
    experiences.forEach((exp, index) => {
      const expErrors = validators.validateExperience(exp)
      if (expErrors) {
        errors[index] = expErrors
      }
    })

    return Object.keys(errors).length === 0 ? null : errors
  },

  // Validate entire CV object
  validateCV: (cvData) => {
    const errors = {}

    // Validate required fields
    const nameError = validators.validateName(cvData.name)
    if (nameError) errors.name = nameError

    const titleError = validators.validateTitle(cvData.title)
    if (titleError) errors.title = titleError

    const contactError = validators.validateContact(cvData.contact)
    if (contactError) errors.contact = contactError

    // Validate optional fields
    const summaryError = validators.validateSummary(cvData.summary)
    if (summaryError) errors.summary = summaryError

    // Validate education
    if (Array.isArray(cvData.education)) {
      cvData.education.forEach((edu, index) => {
        const eduErrors = validators.validateEducation(edu)
        if (eduErrors) {
          errors[`education_${index}`] = eduErrors
        }
      })
    }

    // Validate experience
    const experienceErrors = validators.validateAllExperience(cvData.experience || [])
    if (experienceErrors) errors.experience = experienceErrors

    // Validate skills
    const skillsError = validators.validateSkills(cvData.skills || [])
    if (skillsError) errors.skills = skillsError

    return Object.keys(errors).length === 0 ? null : errors
  },

  // Get a human-readable error message from validation errors
  getErrorMessage: (errors) => {
    if (!errors) return null

    const messages = []
    Object.entries(errors).forEach(([field, error]) => {
      if (typeof error === 'string') {
        messages.push(`${field}: ${error}`)
      } else if (typeof error === 'object') {
        Object.entries(error).forEach(([subField, subError]) => {
          messages.push(`${field}.${subField}: ${subError}`)
        })
      }
    })

    return messages.join('\n')
  }
}

export default validators
