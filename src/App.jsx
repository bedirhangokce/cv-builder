import { useState } from 'react'
import CVEditor from './components/CVEditor'
import CVPreview from './components/CVPreview'
import { CVProvider } from './context/CVContext'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('classic')

  return (
    <CVProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <CVEditor onTemplateChange={setSelectedTemplate} />
            </div>
            <div className="space-y-6">
              <CVPreview template={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>
    </CVProvider>
  )
}

export default App