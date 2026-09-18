import { useEffect, useState } from "react";
import "./App.css";
import { ContactForm } from "./components/ContactForm";
import { Eyebrow, TextLink } from "./components/Brand";
import { FaqList } from "./components/FaqList";
import { IndustryTabs } from "./components/IndustryTabs";
import { ProjectGrid } from "./components/ProjectGrid";
import { ServiceList } from "./components/ServiceList";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import awsLogo from "./assets/technology/aws.svg";

const heroImages = [
  {
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&fm=webp&w=1800&q=82",
    eyebrow: "Pawan Tech Software Solutions · India",
    title: ["Build software", "that moves", "business forward."],
    copy: "Pawan Tech Solution delivers professional web development and tailored digital products for lasting business impact.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&fm=webp&w=1800&q=82",
    eyebrow: "Custom Web Development Services · Together",
    title: ["Turn ideas", "into useful", "experiences."],
    copy: "From the first sketch to the final release, we create responsive web design and digital products ready to grow.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&fm=webp&w=1800&q=82",
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

  const showImage = (index) => {
    setActiveImage((index + heroImages.length) % heroImages.length);
  };

  return (
    <section className="hero section-pad">
      <div className="hero-background" aria-hidden="true">
        {heroImages.map(({ image }, index) => (
          <img
            className={index === activeImage ? "is-active" : ""}
            key={image}
            src={image}
            alt=""
            width="1800"
            height="1200"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            decoding="async"
          />
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
      <Eyebrow>Why Pawan Tech Solution</Eyebrow>
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
            Pawan Tech Solution brings strategy, design, and engineering
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
    <section className="industries section-pad reveal-section">
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
    <section className="numbers section-pad reveal-section">
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
    <section className="faq section-pad reveal-section">
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("has-motion");
    const revealItems = document.querySelectorAll(".reveal-section");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
    return () => {
      revealObserver.disconnect();
      document.documentElement.classList.remove("has-motion");
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <SiteHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        onNavigate={closeMenu}
      />
      <main id="top">
        <Hero />
        <IntroSection />
        <ServicesSection />
        <WorkSection />
        <IndustriesSection />
        <NumbersSection />
        <TechnologySection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
