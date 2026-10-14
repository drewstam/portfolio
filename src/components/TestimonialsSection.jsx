import TESTIMONIALS from '../data/testimonials'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="page-section">
      <h2 className="section-heading">
        <span className="section-heading-solid">CLIENT</span>
        <span className="section-heading-outline">TESTIMONIALS</span>
      </h2>
      <div className="testimonials-list">
        {TESTIMONIALS.map((item) => (
          <article key={item.id} className="testimonial-card">
            <div className="testimonial-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${item.videoId}`}
                title={`Video testimonial from ${item.author}, ${item.role} of ${item.company}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="testimonial-body">
              <h3 className="testimonial-author">{item.author}</h3>
              <p className="testimonial-role">
                {item.role},{' '}
                {item.companyUrl ? (
                  <a href={item.companyUrl} target="_blank" rel="noreferrer" className="testimonial-company-link">
                    {item.company}
                  </a>
                ) : (
                  item.company
                )}
              </p>
              <p className="testimonial-summary">{item.summary}</p>
              <a
                href={`https://youtu.be/${item.videoId}`}
                target="_blank"
                rel="noreferrer"
                className="testimonial-link"
              >
                Watch on YouTube
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
