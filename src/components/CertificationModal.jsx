export default function CertificationModal({ cert, onClose }) {
  if (!cert) return null

  return (
    <div className="details-overlay" onClick={onClose}>
      <div className="details cert-modal" onClick={(e) => e.stopPropagation()}>
        <button className="details-close" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="details-title cert-modal-title">{cert.name}</h2>
        <img
          src={cert.image}
          alt={`${cert.name} certificate`}
          className="cert-modal-image"
        />
      </div>
    </div>
  )
}
