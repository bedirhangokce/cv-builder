import { useCV } from '../context/CVContext'

// Social Icons Component
const SocialIcons = ({ links, size = 20, className = "" }) => {
  const icons = {
    linkedin: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    website: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
      </svg>
    )
  }

  const colors = {
    linkedin: 'text-[#0A66C2] hover:text-[#004182]',
    github: 'text-gray-800 hover:text-black',
    instagram: 'text-[#E4405F] hover:text-[#C13584]',
    website: 'text-emerald-600 hover:text-emerald-700'
  }

  const enabledLinks = Object.entries(links || {}).filter(
    ([_, link]) => link?.enabled && link?.url
  )

  if (enabledLinks.length === 0) return null

  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      {enabledLinks.map(([key, link]) => (
        <a
          key={key}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={key.charAt(0).toUpperCase() + key.slice(1)}
          className={`${colors[key]} transition-all duration-200 hover:scale-110`}
        >
          {icons[key]}
        </a>
      ))}
    </div>
  )
}

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Live preview</span>
      </div>
      <div id="cv-preview-container" className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
        {renderTemplate()}
      </div>
    </div>
  )
}

function ClassicTemplate({ cv }) {
  return (
    <div className="space-y-6" id="cv-preview">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">{cv.name || 'Your Name'}</h1>
        <p className="text-xl text-gray-600 mt-1">{cv.title || 'Your Job Title'}</p>
        <p className="text-gray-600 mt-2">{cv.contact || 'Your Contact Information'}</p>
        <SocialIcons links={cv.links} size={22} className="mt-3" />
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
    <div className="space-y-6" id="cv-preview">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">{cv.name || 'Your Name'}</h1>
        <p className="text-xl mt-1 text-indigo-100">{cv.title || 'Your Job Title'}</p>
        <p className="mt-2 text-indigo-100">{cv.contact || 'Your Contact Information'}</p>
        <div className="mt-3 flex justify-center">
          <div className="flex gap-3">
            {Object.entries(cv.links || {}).filter(([_, l]) => l?.enabled && l?.url).map(([key, link]) => (
              <a
                key={key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
                title={key.charAt(0).toUpperCase() + key.slice(1)}
              >
                {key === 'linkedin' && <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                {key === 'github' && <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
                {key === 'instagram' && <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>}
                {key === 'website' && <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/></svg>}
              </a>
            ))}
          </div>
        </div>
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
    <div className="space-y-6 font-serif" id="cv-preview">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-light text-gray-800">{cv.name || 'Your Name'}</h1>
        <p className="text-lg text-gray-600 mt-1">{cv.title || 'Your Job Title'}</p>
        <p className="text-gray-600 mt-2">{cv.contact || 'Your Contact Information'}</p>
        <SocialIcons links={cv.links} size={18} className="mt-2" />
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
