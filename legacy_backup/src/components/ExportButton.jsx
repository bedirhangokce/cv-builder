import { useCV } from '../context/CVContext'
import html2pdf from 'html2pdf.js'
import validators from '../utils/validation'

export default function ExportButton() {
  const { cv } = useCV()

  const handleExportPDF = async () => {
    // Validate before export
    const errors = validators.validateCV(cv)
    if (errors && Object.keys(errors).length > 0) {
      alert('Please fix the following errors before exporting:\n' + validators.getErrorMessage(errors))
      return
    }

    // Create a temporary div for the CV content
    const element = document.createElement('div')
    element.innerHTML = generateCVHTML(cv)
    element.style.width = '190mm' // A bit less than 210mm to account for default margins if any
    element.style.marginLeft = 'auto'
    element.style.marginRight = 'auto'
    element.style.padding = '10mm' // Reduced padding
    element.style.fontFamily = 'Arial, sans-serif'
    element.style.backgroundColor = 'white'
    element.style.color = 'black'

    // Configure html2pdf options
    const options = {
      margin: [0.3, 0.5, 0.3, 0.5], // Top, Right, Bottom, Left
      filename: `${cv.name || 'CV'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1.5, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }

    // Generate and download PDF
    try {
      await html2pdf().set(options).from(element).save()
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(cv, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)

    const exportFileDefaultName = `${cv.name || 'CV'}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleExportPDF}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        Export as PDF
      </button>
      <button
        onClick={handleExportJSON}
        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
      >
        Export as JSON
      </button>
    </div>
  )
}

function generateCVHTML(cv) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; font-weight: 500;">
      <!-- Header -->
      <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="font-size: 28px; margin: 0; color: #000; font-weight: bold;">${cv.name || 'Your Name'}</h1>
        <p style="font-size: 18px; margin: 5px 0; color: #000; font-weight: 600;">${cv.title || 'Your Job Title'}</p>
        <p style="margin: 5px 0; color: #111;">${cv.contact || 'Your Contact Information'}</p>
      </div>

      <!-- Summary -->
      ${cv.summary ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; margin-bottom: 10px; color: #000; border-bottom: 2px solid #000; padding-bottom: 5px; font-weight: bold;">Professional Summary</h2>
          <p style="color: #111; font-weight: 500;">${cv.summary}</p>
        </div>
      ` : ''}

      <!-- Education -->
      ${cv.education.length > 0 ? `
        <div style="margin-bottom: 30px; page-break-inside: avoid;">
          <h2 style="font-size: 20px; margin-bottom: 15px; color: #000; border-bottom: 2px solid #000; padding-bottom: 5px; font-weight: bold;">Education</h2>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            ${cv.education.map(edu => `
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="margin: 0; color: #000; font-size: 16px; font-weight: bold;">${edu.degree} in ${edu.field}</h3>
                    <p style="margin: 2px 0; color: #111; font-size: 14px; font-weight: 500;">${edu.school}</p>
                  </div>
                  <span style="color: #111; font-size: 14px; font-weight: 500;">${edu.graduationYear}</span>
                </div>
                ${edu.description ? `<p style="margin: 5px 0; color: #111; font-size: 14px; font-weight: 500;">${edu.description}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Experience -->
      ${cv.experience.length > 0 ? `
        <div style="margin-bottom: 30px; page-break-inside: avoid;">
          <h2 style="font-size: 20px; margin-bottom: 15px; color: #000; border-bottom: 2px solid #000; padding-bottom: 5px; font-weight: bold;">Experience</h2>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${cv.experience.map(exp => `
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                  <div>
                    <h3 style="margin: 0; color: #000; font-size: 16px; font-weight: bold;">${exp.jobTitle}</h3>
                    <p style="margin: 2px 0; color: #111; font-size: 14px; font-weight: 500;">${exp.company}</p>
                  </div>
                  <span style="color: #111; font-size: 14px; font-weight: 500;">${exp.startDate} - ${exp.endDate || 'Present'}</span>
                </div>
                ${exp.description ? `<p style="margin: 5px 0; color: #111; font-size: 14px; font-weight: 500;">${exp.description}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Skills -->
      ${cv.skills.length > 0 ? `
        <div style="margin-bottom: 30px; page-break-inside: avoid;">
          <h2 style="font-size: 20px; margin-bottom: 15px; color: #000; border-bottom: 2px solid #000; padding-bottom: 5px; font-weight: bold;">Skills</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
            ${cv.skills.map(skill => `
              <div style="display: flex; align-items: center;">
                <span style="flex: 1; font-size: 14px; color: #111; font-weight: 500;">${skill.name}</span>
                <div style="display: flex; gap: 2px; margin-left: 8px;">
                  ${[1, 2, 3, 4, 5].map(level => `
                    <div style="width: 6px; height: 6px; border-radius: 50%; background-color: ${level <= (skill.level || 3) ? '#000' : '#ccc'};"></div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `
}
