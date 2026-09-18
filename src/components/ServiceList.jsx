import { services } from "../data/siteContent";

export function ServiceList() {
  return (
    <div className="service-list">
      {services.map(({ number, title, kicker, summary, details }) => (
        <article className="service-row" key={number}>
          <div className="service-head">
            <span className="service-number">{number}</span>
            <div>
              <h3>{title}</h3>
              {kicker && <p className="service-kicker">{kicker}</p>}
            </div>
          </div>

          <p className="service-summary">{summary}</p>

          <div className="service-meta">
            <span className="service-meta-label">What&apos;s included</span>
            <ul className="service-tags">
              {details.map((item) => (
                <li key={`${number}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>

          <span className="service-arrow">↗</span>
        </article>
      ))}
    </div>
  );
}
