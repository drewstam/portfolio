import React from 'react'

export default function ExperienceDetails({ project, onClose, inline = false }) {
  if (!project) {
    if (inline) {
      return (
        <aside className="details-panel empty">
          <div className="details-empty">Select a role to see details</div>
        </aside>
      )
    }
    return null
  }

  const content = (
    <div className={`details ${inline ? 'details-inline' : ''}`} onClick={(e) => e.stopPropagation()}>
      {!inline && (
        <button className="details-close" onClick={onClose} aria-label="Close">&times;</button>
      )}
      <h2 className="details-title">{project.title}</h2>
      <div className="details-meta">{project.company} &middot; {project.date}</div>
      <div className="details-tags">
        {(project.tags || []).map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
      <ul className="details-list">
        {(project.details || []).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )

  if (inline) {
    return <aside className="details-panel">{content}</aside>
  }

  return (
    <div className="details-overlay" onClick={onClose}>
      {content}
    </div>
  )
}
