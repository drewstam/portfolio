import React from 'react'
import HOME from '../data/home'

export default function HomeSection() {
  return (
    <section id="home" className="page-section home-section">
      <h1 className="home-headline">
        <span className="home-headline-solid">SOFTWARE</span>
        <span className="home-headline-outline">ENGINEER</span>
      </h1>
      <p className="home-summary">{HOME.summary}</p>
    </section>
  )
}
