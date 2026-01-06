import { useCV } from '../context/CVContext'

export default function CVPreview({ template = 'classic' }) {
  const { cv } = useCV()

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate cv={cv} />
      case 'minimal':
        return <MinimalTemplate cv={cv} />
      default:
        return <ClassicTemplate cv={cv} />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Preview</h2>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        {renderTemplate()}
      </div>
    </div>
  )
}

function ClassicTemplate({ cv }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">{cv.name || 'Your Name'}</h1>
        <p className="text-xl text-gray-600 mt-1">{cv.title || 'Your Job Title'}</p>
        <p className="text-gray-600 mt-2">{cv.contact || 'Your Contact Information'}</p>
      </div>

      {/* Summary */}
      {cv.summary && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Professional Summary</h2>
          <p className="text-gray-700">{cv.summary}</p>
        </div>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Education</h2>
          <div className="space-y-3">
            {cv.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{edu.graduationYear}</span>
                </div>
                {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {cv.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Experience</h2>
          <div className="space-y-4">
            {cv.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                {exp.description && <p className="text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cv.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
          <div className="grid grid-cols-2 gap-2">
            {cv.skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="flex-1">{skill.name}</span>
                <div className="flex gap-1 ml-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-2 h-2 rounded-full ${
                        level <= (skill.level || 3) ? 'bg-gray-800' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ModernTemplate({ cv }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold">{cv.name || 'Your Name'}</h1>
        <p className="text-xl mt-1">{cv.title || 'Your Job Title'}</p>
        <p className="mt-2">{cv.contact || 'Your Contact Information'}</p>
      </div>

      {/* Summary */}
      {cv.summary && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Professional Summary</h2>
          <p className="text-gray-700">{cv.summary}</p>
        </div>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Education</h2>
          <div className="space-y-3">
            {cv.education.map((edu) => (
              <div key={edu.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{edu.graduationYear}</span>
                </div>
                {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {cv.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Experience</h2>
          <div className="space-y-4">
            {cv.experience.map((exp) => (
              <div key={exp.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                {exp.description && <p className="text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cv.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
          <div className="grid grid-cols-2 gap-2">
            {cv.skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="flex-1">{skill.name}</span>
                <div className="flex gap-1 ml-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-2 h-2 rounded-full ${
                        level <= (skill.level || 3) ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MinimalTemplate({ cv }) {
  return (
    <div className="space-y-6 font-serif">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-light text-gray-800">{cv.name || 'Your Name'}</h1>
        <p className="text-lg text-gray-600 mt-1">{cv.title || 'Your Job Title'}</p>
        <p className="text-gray-600 mt-2">{cv.contact || 'Your Contact Information'}</p>
      </div>

      {/* Summary */}
      {cv.summary && (
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-2 border-b border-gray-300 pb-1">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{cv.summary}</p>
        </div>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-3 border-b border-gray-300 pb-1">Education</h2>
          <div className="space-y-3">
            {cv.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-600 text-sm">{edu.school}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{edu.graduationYear}</span>
                </div>
                {edu.description && <p className="text-gray-700 text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {cv.experience.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-3 border-b border-gray-300 pb-1">Experience</h2>
          <div className="space-y-4">
            {cv.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between mb-1">
                  <div>
                    <h3 className="font-medium text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-gray-600 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                {exp.description && <p className="text-gray-700 text-sm">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {cv.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-3 border-b border-gray-300 pb-1">Skills</h2>
          <div className="grid grid-cols-2 gap-2">
            {cv.skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="flex-1 text-sm">{skill.name}</span>
                <div className="flex gap-1 ml-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-1.5 h-1.5 rounded-full ${
                        level <= (skill.level || 3) ? 'bg-gray-800' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
