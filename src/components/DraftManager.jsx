import { useCV } from '../context/CVContext'

export default function DraftManager() {
  const { loadDraft, reset } = useCV()

  const draftSamples = [
    {
      name: 'Software Developer',
      title: 'Senior Software Developer',
      contact: 'john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe',
      summary: 'Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.',
      education: [
        {
          id: 1,
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          school: 'University of Technology',
          graduationYear: '2018',
          description: 'Graduated with honors, focus on software engineering and algorithms.'
        }
      ],
      experience: [
        {
          id: 1,
          jobTitle: 'Senior Software Developer',
          company: 'Tech Corp',
          startDate: '2021-01',
          endDate: '',
          description: 'Lead development of web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.'
        },
        {
          id: 2,
          jobTitle: 'Software Developer',
          company: 'Startup Inc',
          startDate: '2018-06',
          endDate: '2020-12',
          description: 'Developed and maintained multiple client projects. Worked with agile methodologies and contributed to open-source projects.'
        }
      ],
      skills: [
        { id: 1, name: 'JavaScript', level: 5 },
        { id: 2, name: 'React', level: 5 },
        { id: 3, name: 'Node.js', level: 4 },
        { id: 4, name: 'Python', level: 3 },
        { id: 5, name: 'AWS', level: 4 }
      ],
      links: {
        linkedin: { enabled: false, url: '' },
        github: { enabled: false, url: '' },
        instagram: { enabled: false, url: '' },
        website: { enabled: false, url: '' }
      }
    },
    {
      name: 'Marketing Manager',
      title: 'Digital Marketing Manager',
      contact: 'jane.smith@email.com | (555) 987-6543 | linkedin.com/in/janesmith',
      summary: 'Results-driven marketing professional with 6+ years of experience in digital marketing, SEO, and content strategy.',
      education: [
        {
          id: 1,
          degree: 'Master of Business Administration',
          field: 'Marketing',
          school: 'Business University',
          graduationYear: '2017',
          description: 'Specialized in digital marketing and consumer behavior.'
        }
      ],
      experience: [
        {
          id: 1,
          jobTitle: 'Digital Marketing Manager',
          company: 'Brand Agency',
          startDate: '2020-03',
          endDate: '',
          description: 'Managed digital campaigns across multiple channels, resulting in 40% increase in ROI. Led team of 5 marketers.'
        },
        {
          id: 2,
          jobTitle: 'Marketing Specialist',
          company: 'E-commerce Co',
          startDate: '2017-09',
          endDate: '2020-02',
          description: 'Executed social media campaigns and email marketing. Analyzed campaign performance and optimized strategies.'
        }
      ],
      skills: [
        { id: 1, name: 'SEO/SEM', level: 5 },
        { id: 2, name: 'Social Media Marketing', level: 4 },
        { id: 3, name: 'Content Strategy', level: 4 },
        { id: 4, name: 'Google Analytics', level: 5 },
        { id: 5, name: 'Adobe Creative Suite', level: 3 }
      ],
      links: {
        linkedin: { enabled: false, url: '' },
        github: { enabled: false, url: '' },
        instagram: { enabled: false, url: '' },
        website: { enabled: false, url: '' }
      }
    },
    {
      name: 'Data Analyst',
      title: 'Senior Data Analyst',
      contact: 'mike.johnson@email.com | (555) 456-7890 | linkedin.com/in/mikejohnson',
      summary: 'Detail-oriented data analyst with expertise in statistical analysis, data visualization, and business intelligence tools.',
      education: [
        {
          id: 1,
          degree: 'Master of Science',
          field: 'Statistics',
          school: 'State University',
          graduationYear: '2019',
          description: 'Advanced coursework in statistical modeling and machine learning.'
        }
      ],
      experience: [
        {
          id: 1,
          jobTitle: 'Senior Data Analyst',
          company: 'Analytics Firm',
          startDate: '2021-05',
          endDate: '',
          description: 'Build dashboards and reports using Tableau and Power BI. Conducted A/B testing and statistical analysis for product decisions.'
        },
        {
          id: 2,
          jobTitle: 'Data Analyst',
          company: 'Retail Corp',
          startDate: '2019-08',
          endDate: '2021-04',
          description: 'Analyzed sales data and customer behavior. Created automated reporting systems using SQL and Python.'
        }
      ],
      skills: [
        { id: 1, name: 'SQL', level: 5 },
        { id: 2, name: 'Python', level: 4 },
        { id: 3, name: 'Tableau', level: 5 },
        { id: 4, name: 'R', level: 4 },
        { id: 5, name: 'Excel', level: 5 }
      ],
      links: {
        linkedin: { enabled: false, url: '' },
        github: { enabled: false, url: '' },
        instagram: { enabled: false, url: '' },
        website: { enabled: false, url: '' }
      }
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Load Sample CV</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {draftSamples.map((draft, index) => (
          <button
            key={index}
            onClick={() => loadDraft(draft)}
            className="p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-left"
          >
            <h4 className="font-medium text-gray-800">{draft.name}</h4>
            <p className="text-sm text-gray-600">{draft.title}</p>
          </button>
        ))}
      </div>
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Clear All
      </button>
    </div>
  )
}
