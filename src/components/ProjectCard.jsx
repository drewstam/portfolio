import React from 'react'

export default function ProjectCard({ project, onClick }) {
  const cardContent = (
    <>
      <div className="project-card-body">
        <div className="project-title-row">
          {project.icon && (
            <img src={project.icon} alt="" className="project-icon" />
          )}
          <h3 className="project-title">{project.title}</h3>
        </div>
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
    </>
  )

  if (project.landingPageUrl) {
    return (
      <a href={project.landingPageUrl} className="project-card project-card-link">
        {cardContent}
      </a>
    )
  }

  return (
    <article className="project-card" onClick={() => onClick(project)}>
      {cardContent}
    </article>
  )
}
