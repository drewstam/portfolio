export default function CertificationCard({ cert, onClick }) {
  return (
    <article className="experience-card cert-card" onClick={() => onClick(cert)}>
      <div className="cert-card-date">Obtained: {cert.date}</div>
      <div className="experience-card-body cert-card-body">
        <h3 className="experience-title">{cert.name}</h3>
        <p className="experience-company">{cert.issuer}</p>
      </div>
      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noreferrer"
        className="cert-verify-link"
        onClick={(e) => e.stopPropagation()}
      >
        Verify Credential ↗
      </a>
    </article>
  )
}
