import React from 'react'
import ProjectCard from './ProjectCard'
import PROJECTS from '../data/projects'

export default function ProjectsSection({ onSelect }) {
  return (
    <section id="projects" className="page-section">
      <h2 className="section-heading">
        <span className="section-heading-solid">RECENT</span>
        <span className="section-heading-outline">PROJECTS</span>
      </h2>
      <div className="projects-list">
        {PROJECTS.map((item) => (
          <ProjectCard key={item.id} project={item} onClick={onSelect} />
        ))}
      </div>
    </section>
  )
}
