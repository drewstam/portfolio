import React from 'react'

export default function ProjectDetails({ project, onClose, inline = false }) {
  if (!project) {
    if (inline) {
      return (
        <aside className="details-panel empty">
          <div className="details-empty">Select a project to see details</div>
        </aside>
      )
    }
    return null
  }

  const content = (
    <div className={`details ${inline ? 'details-inline' : ''}`} onClick={(e) => e.stopPropagation()}>
      {!inline && (
        <button className="details-close" onClick={onClose} aria-label="Close">×</button>
      )}
      <h2 className="details-title">{project.title}</h2>
      <div className="details-meta">{project.date} · {(project.tags || []).join(', ')}</div>
      <p className="details-description">{project.details || project.summary}</p>
      {project.links && (
        <div className="details-links">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="details-link">{l.label}</a>
          ))}
        </div>
      )}
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
