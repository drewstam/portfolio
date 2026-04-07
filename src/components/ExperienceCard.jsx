import React from 'react'

export default function ExperienceCard({ project, onClick, active }) {
  return (
    <article className={`experience-card${active ? ' active' : ''}`} onClick={() => onClick(project)}>
      {project.location && (
        <div className="experience-card-location">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{project.location}</span>
        </div>
      )}
      <div className="experience-card-body">
        <h3 className="experience-title">{project.title}</h3>
        <p className="experience-company">{project.company}</p>
      </div>
      <div className="experience-meta">
        <span className="experience-date">{project.date}</span>
        <div className="experience-tags">
          {(project.tags || []).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
