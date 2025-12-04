import React from 'react'

export default function ProjectCard({ project, onClick }) {
  return (
    <article className="project-card" onClick={() => onClick(project)}>
      <div className="project-card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
      </div>
      <div className="project-meta">
        <span className="project-date">{project.date}</span>
        <div className="project-tags">
          {(project.tags || []).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
