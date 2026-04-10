import { useEffect, useRef, useState } from 'react'
import './App.css'
import Profile from './components/Profile'
import TopNav from './components/TopNav'
import HomeSection from './components/HomeSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import ToolsSection from './components/ToolsSection'
import ExperienceDetails from './components/ExperienceDetails'
import ProjectDetails from './components/ProjectDetails'
import ContactModal from './components/ContactModal'

const SECTION_IDS = ['home', 'experience', 'projects', 'tools']

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [contactOpen, setContactOpen] = useState(false)
  const contactTriggerRef = useRef(null)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavigate = (id) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app-container">
      <TopNav active={activeSection} onNavigate={handleNavigate} theme={theme} onToggleTheme={toggleTheme} />

      <div className="page-layout">
        <aside className="profile-column">
          <Profile
            name="Andrew Stam"
            title="Software Engineer"
            contact={{ email: 'j.andrew.stam@gmail.com', location: 'Toronto, ON Canada' }}
            onOpenContact={() => setContactOpen(true)}
            triggerRef={contactTriggerRef}
          />
        </aside>

        <main className="content-column">
          <HomeSection />
          <ExperienceSection onSelect={setSelectedExperience} />
          <ProjectsSection onSelect={setSelectedProject} />
          <ToolsSection />
        </main>
      </div>

      {selectedExperience && (
        <ExperienceDetails
          project={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      {contactOpen && (
        <ContactModal
          onClose={() => setContactOpen(false)}
          triggerRef={contactTriggerRef}
        />
      )}
    </div>
  )
}

export default App
