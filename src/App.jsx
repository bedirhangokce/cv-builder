import { useState } from 'react'
import CVEditor from './components/CVEditor'
import CVPreview from './components/CVPreview'
import { CVProvider } from './context/CVContext'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('classic')

  return (
    <CVProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    CV Builder
                  </h1>
                  <p className="text-xs text-gray-500">Create your professional resume</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Auto-saving enabled
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <CVEditor onTemplateChange={setSelectedTemplate} />
              </div>
            </div>
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <CVPreview template={selectedTemplate} />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/50 border-t border-gray-200 py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            Built with ❤️ using React & Tailwind CSS
          </div>
        </footer>
      </div>
    </CVProvider>
  )
}

export default App