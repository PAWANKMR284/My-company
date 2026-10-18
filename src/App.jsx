import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { BlogSection } from "./components/BlogSection";
import { ContactForm } from "./components/ContactForm";
import { Eyebrow, TextLink } from "./components/Brand";
import { FaqList } from "./components/FaqList";
import { IndustryTabs } from "./components/IndustryTabs";
import { ProjectGrid } from "./components/ProjectGrid";
import { ServiceList } from "./components/ServiceList";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import awsLogo from "./assets/technology/aws.svg";

const BlogIndexPage = lazy(() =>
  import("./components/BlogIndexPage").then(({ BlogIndexPage: Page }) => ({
    default: Page,
  })),
);
const BlogPage = lazy(() =>
  import("./components/BlogPage").then(({ BlogPage: Page }) => ({
    default: Page,
  })),
);

const heroImageWidths = [480, 640, 960, 1440];
const heroImageUrl = (image, width, format = "webp") =>
  image.startsWith("/")
    ? image.replace(/-\d+\.\w+$/, `-${width}.${format}`)
    : `${image}&w=${width}&q=45`;
const heroImageSrcSet = (image, format = "webp") =>
  heroImageWidths
    .map((width) => `${heroImageUrl(image, width, format)} ${width}w`)
    .join(", ");
const heroThumbnailSrcSet = (image) =>
  image.startsWith("/")
    ? heroImageSrcSet(image, "avif")
    : [320, 480, 640]
        .map((width) => `${image}&w=${width}&q=35 ${width}w`)
        .join(", ");
let heroImagesPrefetched = false;

const prefetchOtherHeroImages = () => {
  if (heroImagesPrefetched) return;
  heroImagesPrefetched = true;

  window.setTimeout(() => {
    heroImages.slice(1).forEach(({ image }) => {
      const imageHint = new Image();
      imageHint.fetchPriority = "low";
      imageHint.decoding = "async";
      imageHint.sizes = "100vw";
      imageHint.srcset = heroImageSrcSet(image);
      imageHint.src = heroImageUrl(image, 960);
    });
  }, 1000);
};

const heroImages = [
  {
    image: "/images/hero-640.webp",
    eyebrow: "Vayulogic Tech Solution · India",
    title: ["Build software", "that moves", "business forward."],
    copy: "Vayulogic Tech Solution delivers professional web development and tailored digital products for lasting business impact.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&fm=webp",
    eyebrow: "Custom Web Development Services · Together",
    title: ["Turn ideas", "into useful", "experiences."],
    copy: "From the first sketch to the final release, we create responsive web design and digital products ready to grow.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&fm=webp",
    eyebrow: "IT Consultancy Solutions for bold teams",
    title: ["Make progress", "feel", "remarkable."],
    copy: "Senior thinking and thoughtful technology help your team move faster with practical software solutions in Delhi and beyond.",
  },
];

function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const activeSlide = heroImages[activeImage];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImage((currentImage) => (currentImage + 1) % heroImages.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const heroArt = document.querySelector(".hero-side-art");
    if (
      !heroArt ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const cards = [...heroArt.querySelectorAll("[data-parallax]")];
    let animationFrame = 0;

    const updateParallax = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        const hero = heroArt.closest(".hero");
        if (!hero) return;

        const progress = Math.min(
          1,
          Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight),
        );
        cards.forEach((card) => {
          const depth = Number(card.dataset.parallax) || 0;
          card.style.translate = `0 ${Math.round(progress * depth)}px`;
        });
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);

    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const showImage = (index) => {
    setActiveImage((index + heroImages.length) % heroImages.length);
  };

  return (
    <section className="hero section-pad" id="top">
      <div className="hero-background" aria-hidden="true">
        {heroImages.map(
          ({ image }, index) =>
            index === activeImage && (
              <picture key={image}>
                {image.startsWith("/") && (
                  <>
                    <source
                      media="(max-width: 760px)"
                      type="image/avif"
                      srcSet="/images/hero-mobile.avif"
                    />
                    <source
                      media="(min-width: 761px)"
                      type="image/avif"
                      srcSet={heroImageUrl(image, 1440, "avif")}
                    />
                  </>
                )}
                <img
                  className="is-active"
                  src={heroImageUrl(image, 960)}
                  srcSet={heroImageSrcSet(image)}
                  sizes="100vw"
                  alt=""
                  width="1800"
                  height="1200"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onLoad={prefetchOtherHeroImages}
                />
              </picture>
            ),
        )}
      </div>
      <div className="hero-side-art" aria-hidden="true">
        <span className="hero-orbit hero-orbit-one" />
        <span className="hero-orbit hero-orbit-two" />
        {heroImages.map(({ image }, index) => (
          <figure
            className={`hero-float-card hero-float-card-${index + 1}`}
            data-parallax={18 + index * 12}
            key={image}
          >
            <picture>
              {image.startsWith("/") && (
                <source
                  type="image/avif"
                  srcSet={heroThumbnailSrcSet(image)}
                  sizes="(max-width: 760px) 32vw, 18vw"
                />
              )}
              <img
                src={heroImageUrl(image, image.startsWith("/") ? 480 : 320)}
                srcSet={
                  image.startsWith("/")
                    ? heroImageSrcSet(image)
                    : heroThumbnailSrcSet(image)
                }
                sizes="(max-width: 760px) 32vw, 18vw"
                alt=""
                width="640"
                height="480"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>
        ))}
      </div>
      <div className="hero-wordmark" aria-hidden="true">
        {"ARTCRAFT".split("").map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="hero-copy reveal">
        <Eyebrow line>{activeSlide.eyebrow}</Eyebrow>
        <h1 key={`title-${activeImage}`}>
          {activeSlide.title[0]}
          <br />
          <em>{activeSlide.title[1]}</em>
          <br />
          {activeSlide.title[2]}
        </h1>
        <p className="hero-intro" key={`copy-${activeImage}`}>
          {activeSlide.copy}
        </p>
        <a className="circle-link" href="#contact" aria-label="Start a project">
          ↘
        </a>
      </div>
      <div className="hero-visual reveal reveal-delay">
        <div className="hero-ring" />
      </div>
      <div className="hero-footer">
        <span>
          0{activeImage + 1} / 0{heroImages.length}
        </span>
        <span className="hero-rule" />
        <div className="hero-controls" aria-label="Hero images">
          <button
            type="button"
            onClick={() => showImage(activeImage - 1)}
            aria-label="Previous hero image"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => showImage(activeImage + 1)}
            aria-label="Next hero image"
          >
            →
          </button>
        </div>
        <span>Scroll to explore ↓</span>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="intro section-pad reveal-section" id="about">
      <Eyebrow>Why Vayulogic Tech Solution</Eyebrow>
      <div className="intro-grid">
        <h2>
          Good software
          <br />
          starts with <em>clarity.</em>
        </h2>
        <div>
          <p className="lead">
            The best digital products feel simple because a lot of care went
            into making them that way. As a Web Development Company in Varanasi,
            Vayulogic Tech Solution brings strategy, design, and engineering
            together to make complex things feel clear.
          </p>
          <TextLink>More about us</TextLink>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="services section-pad reveal-section" id="services">
      <div className="section-heading">
        <Eyebrow>What we do</Eyebrow>
        <h2>
          Professional IT &amp; Web
          <br />
          <em>development services.</em>
        </h2>
      </div>
      <ServiceList />
    </section>
  );
}

function WorkSection() {
  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      copy: "We start by understanding your business goals, users, and constraints. No assumptions — just sharp questions and clear answers.",
    },
    {
      number: "02",
      title: "Planning",
      copy: "We define scope, architecture, and timeline. You get a detailed project plan before any code is written.",
    },
    {
      number: "03",
      title: "Build",
      copy: "Iterative development with weekly demos. You see progress every step of the way — no black-box delivery.",
    },
    {
      number: "04",
      title: "Launch",
      copy: "We deploy, test, and hand over. Full documentation, clean code, and post-launch support included.",
    },
  ];

  return (
    <section className="work section-pad reveal-section" id="work">
      <div className="section-heading work-heading">
        <div>
          <Eyebrow>Selected work</Eyebrow>
          <h2>
            Ideas into
            <br />
            <em>impact.</em>
          </h2>
        </div>
        <TextLink className="light-link">View all work</TextLink>
      </div>
      <ProjectGrid />

      <div className="how-we-work">
        <div className="how-we-work-header">
          <h2 className="how-we-work-heading">How We Work</h2>
        </div>
        <p className="how-we-work-subtitle">
          A clear, no-surprises process from kickoff to launch.
        </p>

        <div className="work-process-grid">
          {processSteps.map(({ number, title, copy }) => (
            <article className="process-step" key={number}>
              <span className="process-number">{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section
      className="industries section-pad reveal-section"
      id="industries"
    >
      <div className="industry-head">
        <div>
          <Eyebrow>Across industries</Eyebrow>
          <h2>
            Different worlds.
            <br />
            <em>One standard.</em>
          </h2>
        </div>
        <p>
          Deep enough to understand your context. Curious enough to challenge
          it.
        </p>
      </div>
      <IndustryTabs />
    </section>
  );
}

function NumbersSection() {
  const numbers = [
    ["12", "products shipped"],
    ["08", "countries reached"],
    ["4.9", "average partner rating"],
    ["100%", "care, always"],
  ];

  return (
    <section className="numbers section-pad reveal-section" id="numbers">
      <Eyebrow>A small studio. A big point of view.</Eyebrow>
      <div className="number-grid">
        {numbers.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TechnologySection() {
  const technologies = [
    { name: "AWS", logo: awsLogo },
    {
      name: "TypeScript",
      logo: "https://cdn.simpleicons.org/typescript/3178C6",
    },
    { name: "Java", logo: "https://cdn.simpleicons.org/openjdk/ED8B00" },
    {
      name: "Spring Boot",
      logo: "https://cdn.simpleicons.org/springboot/6DB33F",
    },
    { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "React Native", logo: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
    { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/412991" },
    {
      name: "TensorFlow",
      logo: "https://cdn.simpleicons.org/tensorflow/FF6F00",
    },
    { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
    { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
    {
      name: "Hugging Face",
      logo: "https://cdn.simpleicons.org/huggingface/FFD21E",
    },
    { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/FFCA28" },
    {
      name: "PostgreSQL",
      logo: "https://cdn.simpleicons.org/postgresql/4169E1",
    },
    { name: "MySQL", logo: "https://cdn.simpleicons.org/mysql/4479A1" },
    { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
    { name: "Flutter", logo: "https://cdn.simpleicons.org/flutter/02569B" },
    { name: ".NET", logo: "https://cdn.simpleicons.org/dotnet/512BD4" },
    { name: "Angular", logo: "https://cdn.simpleicons.org/angular/DD0031" },
    { name: "Vue", logo: "https://cdn.simpleicons.org/vuedotjs/4FC08D" },
    { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
    { name: "Go", logo: "https://cdn.simpleicons.org/go/00ADD8" },
    { name: "Laravel", logo: "https://cdn.simpleicons.org/laravel/FF2D20" },
    { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
    {
      name: "Kubernetes",
      logo: "https://cdn.simpleicons.org/kubernetes/326CE5",
    },
    { name: "GraphQL", logo: "https://cdn.simpleicons.org/graphql/E10098" },
    {
      name: "Tailwind CSS",
      logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    },
    { name: "Swift", logo: "https://cdn.simpleicons.org/swift/F05138" },
    { name: "Kotlin", logo: "https://cdn.simpleicons.org/kotlin/7F52FF" },
  ];
  const marqueeItems = [...technologies, ...technologies];

  return (
    <section
      className="technology section-pad reveal-section"
      id="technologies"
    >
      <div className="technology-header">
        <h2 className="technology-title">Technologies we work with</h2>
      </div>
      <div
        className="technology-marquee"
        aria-label="Technologies we work with"
      >
        <div className="technology-track">
          {marqueeItems.map((technology, index) => (
            <span
              key={`${technology.name}-${index}`}
              className="technology-badge"
            >
              <img
                src={technology.logo}
                alt={technology.name}
                className="technology-logo"
                loading="lazy"
              />
              <span>{technology.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="faq section-pad reveal-section" id="faq">
      <div className="faq-intro">
        <Eyebrow>Good to know</Eyebrow>
        <h2>
          Questions,
          <br />
          <em>answered.</em>
        </h2>
        <p>Still curious? We like curious people.</p>
        <TextLink>Ask us anything</TextLink>
      </div>
      <FaqList />
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact section-pad reveal-section" id="contact">
      <div className="contact-copy">
        <Eyebrow>Have a good one?</Eyebrow>
        <h2>
          Let&apos;s make
          <br />
          something <em>matter.</em>
        </h2>
        <p>
          Share a little about your challenge, your idea, or just say hello.
        </p>
        <a href="mailto:pwnkumar284@gmail.com" className="email-link">
          pwnkumar284@gmail.com <span>↗</span>
        </a>
      </div>
      <ContactForm />
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesSection />
      <WorkSection />
      <IndustriesSection />
      <NumbersSection />
      <TechnologySection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}

const journeySections = [
  ["top", "Home"],
  ["about", "About"],
  ["services", "Services"],
  ["work", "Work"],
  ["industries", "Industries"],
  ["numbers", "Studio"],
  ["technologies", "Technology"],
  ["faq", "FAQ"],
  ["contact", "Contact"],
];
const scrollTickValues = Array.from({ length: 21 }, (_, index) => index * 5);

function ScrollProgressRail() {
  const [activeSection, setActiveSection] = useState("top");
  const [progress, setProgress] = useState(0);
  const isDragging = useRef(false);

  const scrollToProgress = (value) => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const nextProgress = Math.min(100, Math.max(0, value));

    window.scrollTo({
      top: (scrollableHeight * nextProgress) / 100,
      behavior: "instant",
    });
  };

  const updateProgressFromPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextProgress = ((event.clientY - bounds.top) / bounds.height) * 100;

    scrollToProgress(nextProgress);
  };

  const handleProgressKeyDown = (event) => {
    const keyProgress = {
      ArrowDown: progress + 1,
      ArrowUp: progress - 1,
      End: 100,
      Home: 0,
      PageDown: progress + 10,
      PageUp: progress - 10,
    }[event.key];

    if (keyProgress === undefined) return;
    event.preventDefault();
    scrollToProgress(keyProgress);
  };

  useEffect(() => {
    const sections = journeySections
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);
    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    let animationFrame = 0;

    const updateProgress = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress =
          scrollableHeight > 0
            ? Math.round((window.scrollY / scrollableHeight) * 100)
            : 0;

        setProgress((currentProgress) =>
          currentProgress === nextProgress ? currentProgress : nextProgress,
        );
      });
    };

    sections.forEach((section) => activeObserver.observe(section));
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      activeObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <aside
      className="scroll-progress-rail"
      aria-label="Page sections"
      data-tone={
        ["top", "about", "services", "faq"].includes(activeSection)
          ? "light"
          : "dark"
      }
    >
      <nav className="scroll-progress-nav" aria-label="On this page">
        {journeySections.map(([id, label]) => (
          <a
            href={`#${id}`}
            key={id}
            className={activeSection === id ? "is-active" : ""}
            aria-current={activeSection === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <div
        className="scroll-progress-scale"
        role="scrollbar"
        aria-label="Page scroll progress"
        aria-controls="main-content"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-valuetext={`${progress}% through page`}
        tabIndex={0}
        onKeyDown={handleProgressKeyDown}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          isDragging.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          updateProgressFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (isDragging.current || event.buttons === 1) {
            updateProgressFromPointer(event);
          }
        }}
        onPointerUp={() => {
          isDragging.current = false;
        }}
        onPointerCancel={() => {
          isDragging.current = false;
        }}
      >
        {scrollTickValues.map((value) => (
          <span
            className={`scroll-progress-tick${value % 10 === 0 ? " is-major" : ""}${value <= progress ? " is-reached" : ""}${value === Math.round(progress / 5) * 5 ? " is-current" : ""}`}
            data-value={value}
            key={value}
            style={{ top: `${value}%` }}
          >
            {value}
          </span>
        ))}
        <span
          className={`scroll-progress-marker${progress === 0 ? " at-start" : ""}${progress === 100 ? " at-end" : ""}`}
          style={{ top: `${progress}%` }}
          aria-hidden="true"
        >
          <span />
          <b>{progress}</b>
        </span>
      </div>
    </aside>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("has-motion");
    const revealSelector = [
      "main h1",
      "main h2",
      "main h3",
      ".hero-copy > .eyebrow",
      ".reveal-section .eyebrow",
      ".reveal-section .intro-grid > div",
      ".reveal-section .number-grid > div",
      ".reveal-section .technology-header",
      ".reveal-section .technology-marquee",
      ".reveal-section .service-row",
      ".reveal-section .project-card",
      ".reveal-section .how-we-work-header",
      ".reveal-section .how-we-work-subtitle",
      ".reveal-section .process-step",
      ".reveal-section .industry-tabs",
      ".reveal-section .industry-note",
      ".reveal-section .industry-head > p",
      ".reveal-section .blog-card",
      ".reveal-section .faq-list",
      ".reveal-section .faq-intro > p",
      ".reveal-section .faq-intro > .text-link",
      ".reveal-section .contact-copy > p",
      ".reveal-section .contact-copy > .email-link",
      ".reveal-section .contact-form",
      ".reveal-section .section-heading > .text-link",
      ".site-footer .footer-main > div",
      ".site-footer .footer-bottom",
      ".blog-page-header",
      ".blog-index-header",
      ".blog-index-card",
      ".blog-post-image",
      ".blog-post-intro",
      ".blog-post-section",
    ].join(", ");
    const siblingIndexes = new WeakMap();
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
          if (isIntersecting && intersectionRatio >= 0.12) {
            target.classList.add("is-visible");
          } else {
            target.classList.remove("is-visible");
          }
        });
      },
      { threshold: [0, 0.12], rootMargin: "0px 0px -6% 0px" },
    );
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            animateHeadingLetters(target);
            headingObserver.unobserve(target);
          }
        });
      },
      { rootMargin: "120px 0px 120px 0px" },
    );

    const animateHeadingLetters = (heading) => {
      if (heading.dataset.lettersReady) return;

      heading.dataset.lettersReady = "true";
      if (!heading.hasAttribute("aria-label")) {
        heading.setAttribute(
          "aria-label",
          heading.textContent.replace(/\s+/g, " ").trim(),
        );
      }

      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      while (walker.nextNode()) {
        if (walker.currentNode.textContent.trim()) {
          textNodes.push(walker.currentNode);
        }
      }

      let characterIndex = 0;
      textNodes.forEach((textNode) => {
        const fragment = document.createDocumentFragment();
        textNode.textContent.split(/(\s+)/u).forEach((part) => {
          if (!part) return;
          if (/^\s+$/u.test(part)) {
            fragment.appendChild(document.createTextNode(part));
            return;
          }

          const word = document.createElement("span");
          word.className = "headline-word";
          Array.from(part).forEach((character) => {
            const letter = document.createElement("span");
            letter.className = "headline-character";
            letter.setAttribute("aria-hidden", "true");
            letter.style.setProperty(
              "--char-delay",
              `${Math.min(characterIndex, 26) * 12}ms`,
            );
            letter.textContent = character;
            word.appendChild(letter);
            characterIndex += 1;
          });
          fragment.appendChild(word);
        });
        textNode.parentNode.replaceChild(fragment, textNode);
      });
    };

    const registerTarget = (target) => {
      if (target.matches("h1, h2, h3") && !target.dataset.lettersReady) {
        headingObserver.observe(target);
      }
      if (!target.classList.contains("scroll-reveal-item")) {
        const parent = target.parentElement;
        const siblingIndex = siblingIndexes.get(parent) || 0;
        siblingIndexes.set(parent, siblingIndex + 1);
        target.classList.add("scroll-reveal-item");
        target.style.setProperty(
          "--scroll-reveal-delay",
          `${Math.min(siblingIndex, 4) * 90}ms`,
        );
      }
      revealObserver.observe(target);
    };

    const scanTargets = (root) => {
      if (
        root.nodeType !== Node.ELEMENT_NODE &&
        root.nodeType !== Node.DOCUMENT_NODE
      ) {
        return;
      }
      if (
        root.nodeType === Node.ELEMENT_NODE &&
        root.closest(
          "h1[data-letters-ready], h2[data-letters-ready], h3[data-letters-ready]",
        )
      ) {
        return;
      }
      if (
        root.nodeType === Node.ELEMENT_NODE &&
        root.matches(revealSelector)
      ) {
        registerTarget(root);
      }
      root.querySelectorAll(revealSelector).forEach(registerTarget);
    };

    scanTargets(document);
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(scanTargets);
      });
    });
    mutationObserver.observe(document.querySelector("#main-content"), {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      headingObserver.disconnect();
      document.documentElement.classList.remove("has-motion");
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) {
      return;
    }

    const targetId = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(targetId);

    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.pathname, location.hash]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <SiteHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        onNavigate={closeMenu}
      />
      <main id="main-content" className="site-main">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {location.pathname === "/" && <ScrollProgressRail />}
      {location.pathname === "/" && <SiteFooter />}
      {location.pathname.startsWith("/blog") && <SiteFooter />}
    </div>
  );
}

export default App;
