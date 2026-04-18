import CertificationCard from './CertificationCard'
import CERTIFICATIONS from '../data/certifications'

export default function CertificationsSection({ onSelect }) {
  return (
    <section id="certifications" className="page-section">
      <h2 className="section-heading">
        <span className="section-heading-solid">MY</span>
        <span className="section-heading-outline">CERTIFICATIONS</span>
      </h2>
      <div className="experience-list">
        {CERTIFICATIONS.map((cert) => (
          <CertificationCard key={cert.id} cert={cert} onClick={onSelect} />
        ))}
      </div>
    </section>
  )
}
