import { useEffect, useState } from "react";
import { projects } from "../data/siteContent";

function ProjectCarousel({ title, tag, image, images }) {
  const slides = images?.length ? images : [image];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused, slides.length]);

  const showSlide = (index) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <div
      className="project-image project-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <img
          className={index === activeIndex ? "is-active" : ""}
          key={slide}
          src={slide}
          srcSet={`${slide}&w=700 700w, ${slide}&w=1200 1200w`}
          sizes="(max-width: 760px) 100vw, 50vw"
          alt={`${title} project, view ${index + 1}`}
          width="1200"
          height="800"
          loading="lazy"
          fetchPriority="low"
          decoding="async"
        />
      ))}
      <span>{tag}</span>
      {slides.length > 1 && (
        <div
          className="carousel-controls"
          aria-label={`${title} project images`}
        >
          <button
            type="button"
            onClick={() => showSlide(activeIndex - 1)}
            aria-label={`Previous ${title} image`}
          >
            &#8592;
          </button>
          <div className="carousel-dots">
            {slides.map((slide, index) => (
              <button
                className={index === activeIndex ? "is-active" : ""}
                key={slide}
                type="button"
                onClick={() => showSlide(index)}
                aria-label={`Show ${title} image ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => showSlide(activeIndex + 1)}
            aria-label={`Next ${title} image`}
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
}

export function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map(({ tag, title, copy, image, images }, index) => (
        <article className={`project-card project-${index + 1}`} key={title}>
          <ProjectCarousel
            title={title}
            tag={tag}
            image={image}
            images={images}
          />
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
