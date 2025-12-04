import { useState } from 'react'
import './App.css'
import Profile from './components/Profile'
import ProjectCard from './components/ProjectCard'
import ProjectDetails from './components/ProjectDetails'

const SAMPLE_PROJECTS = [
  {
    id: '1',
    title: 'Project Alpha',
    summary: 'A web app that helps teams coordinate tasks and milestones.',
    details:
      'Built with React and Vite. Implemented feature X, improved performance by 30%, and led deployment.',
    date: '2024',
    tags: ['React', 'Vite', 'Performance'],
    links: [{ href: 'https://example.com', label: 'Live' }],
  },
  {
    id: '2',
    title: 'Data Pipeline',
    summary: 'Backend ETL pipeline for processing analytics events.',
    details: 'Designed and implemented scalable ingestion and processing with monitoring.',
    date: '2023',
    tags: ['ETL', 'Python'],
  },
  {
    id: '3',
    title: 'Open-source Contribution',
    summary: 'Contributed core feature to popular library.',
    details: 'Authored PR that added feature Y and improved docs; accepted upstream after review.',
    date: '2022',
    tags: ['OSS', 'Documentation'],
  },
]


const SAMPLE_EXPERIENCE = [
  {
    id: 'exp1',
    title: 'Senior Developer, Salesforce',
    summary: 'Led cloud integrations and automation for enterprise clients.',
    details: 'Architected scalable solutions, mentored junior engineers, and delivered key features.',
    date: '2021-2024',
    tags: ['Salesforce', 'Cloud', 'Leadership'],
  },
  {
    id: 'exp2',
    title: 'Software Engineer, Acme Inc',
    summary: 'Built internal tools and improved CI/CD pipelines.',
    details: 'Reduced deployment times by 40% and improved reliability.',
    date: '2018-2021',
    tags: ['CI/CD', 'Tooling'],
  },
]

const SAMPLE_EDUCATION = [
  {
    id: 'edu1',
    title: 'B.Sc. Computer Science',
    summary: 'University of Example, 2014-2018',
    details: 'Graduated with honors. Focused on software engineering and AI.',
    date: '2018',
    tags: ['Degree'],
  },
  {
    id: 'cert1',
    title: 'Certified Salesforce Developer',
    summary: 'Salesforce Certification, 2022',
    details: 'Demonstrated expertise in Salesforce platform and development.',
    date: '2022',
    tags: ['Certification', 'Salesforce'],
  },
]

const GROUPS = [
  {
    key: 'experience',
    label: 'Work Experience',
    summary: 'Professional roles and achievements.',
    items: SAMPLE_EXPERIENCE,
  },
  {
    key: 'projects',
    label: 'Projects',
    summary: 'Selected personal and professional projects.',
    items: SAMPLE_PROJECTS,
  },
  {
    key: 'education',
    label: 'Education/Certifications',
    summary: 'Degrees and certifications.',
    items: SAMPLE_EDUCATION,
  },
]

function App() {
  const [activeGroup, setActiveGroup] = useState(GROUPS[0].key)
  const [selected, setSelected] = useState(null)

  const currentGroup = GROUPS.find((g) => g.key === activeGroup)

  return (
    <div className="app-container">
      <aside className="sidebar">
        <Profile
          name="Andrew Stam"
          title="Software Engineer"
          contact={{ email: 'j.andrew.stam@gmail.com', location: 'Digital Nomad' }}
        />
        <nav className="sidebar-groups">
          {GROUPS.map((g) => (
            <button
              key={g.key}
              className={`sidebar-group-btn${activeGroup === g.key ? ' active' : ''}`}
              onClick={() => {
                setActiveGroup(g.key)
                setSelected(null)
              }}
            >
              <div className="sidebar-group-label">{g.label}</div>
              <div className="sidebar-group-summary">{g.summary}</div>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="main-header">
          <h1 className="app-title">Portfolio</h1>
          <p className="app-subtitle">{currentGroup.summary}</p>
        </header>

        <section className="projects-grid">
          {currentGroup.items.map((item) => (
            <ProjectCard key={item.id} project={item} onClick={setSelected} />
          ))}
        </section>
      </main>

      <ProjectDetails project={selected} onClose={() => setSelected(null)} inline />
    </div>
  )
}

export default App
