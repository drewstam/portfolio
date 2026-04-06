import React from 'react'
import TOOLS from '../data/tools'

export default function ToolsSection() {
  return (
    <section id="tools" className="page-section">
      <h2 className="section-heading">
        <span className="section-heading-solid">PREMIUM</span>
        <span className="section-heading-outline">TOOLS</span>
      </h2>
      <div className="tools-grid">
        {TOOLS.map((tool) => (
          <div key={tool.id} className="tool-card">
            <div className="tool-icon">{tool.initial}</div>
            <div className="tool-name">{tool.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
