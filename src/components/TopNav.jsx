import React from 'react'

const NAV_ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'experience', label: 'Experience' },
  { key: 'projects', label: 'Projects' },
  { key: 'tools', label: 'Tools' },
]

export default function TopNav({ active, onNavigate }) {
  return (
    <nav className="top-nav">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          className={`top-nav-btn${active === item.key ? ' active' : ''}`}
          onClick={() => onNavigate(item.key)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
