import React from 'react'
import ExperienceCard from './ExperienceCard'
import EXPERIENCE from '../data/experience'

export default function ExperienceSection({ onSelect }) {
  return (
    <section id="experience" className="page-section">
      <h2 className="section-heading">
        <span className="section-heading-solid">WORK</span>
        <span className="section-heading-outline">EXPERIENCE</span>
      </h2>
      <div className="experience-list">
        {EXPERIENCE.map((item) => (
          <ExperienceCard key={item.id} project={item} onClick={onSelect} />
        ))}
      </div>
    </section>
  )
}
