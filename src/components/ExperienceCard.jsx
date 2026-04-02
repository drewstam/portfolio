import React from 'react'

export default function ExperienceCard({ project, onClick, active }) {
  return (
    <article className={`experience-card${active ? ' active' : ''}`} onClick={() => onClick(project)}>
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
