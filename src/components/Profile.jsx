import React from 'react'
import profile from '../assets/salesforce.png'

export default function Profile({ name = 'Andrew Stam', title = 'Software Developer', contact = {} }) {
  return (
    <div className="profile">
      <div className="profile-photo-wrapper">
        <img src={profile} alt="profile" className="profile-photo" />
      </div>
      <div className="profile-info">
        <h2 className="profile-name">{name}</h2>
        <div className="profile-title">{title}</div>
        <div className="profile-contact">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="contact-link">{contact.email}</a>
          )}
          {contact.location && <div className="contact-muted">{contact.location}</div>}
        </div>
      </div>
    </div>
  )
}
