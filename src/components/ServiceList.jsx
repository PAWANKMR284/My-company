import { services } from "../data/siteContent";

export function ServiceList() {
  return (
    <div className="service-list">
      {services.map(({ number, title, copy }) => (
        <article className="service-row" key={number}>
          <span className="service-number">{number}</span>
          <h3>{title}</h3>
          <p>{copy}</p>
          <span className="service-arrow">↗</span>
        </article>
      ))}
    </div>
  );
}
