import { projects } from "../data/siteContent";

export function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map(({ tag, title, copy, image }, index) => (
        <article className={`project-card project-${index + 1}`} key={title}>
          <div className="project-image">
            <img
              src={image}
              alt={`${title} project`}
              loading="lazy"
              decoding="async"
            />
            <span>{tag}</span>
          </div>
          <div className="project-meta">
            <h3>{title}</h3>
            <p>{copy}</p>
            <span>↗</span>
          </div>
        </article>
      ))}
    </div>
  );
}
