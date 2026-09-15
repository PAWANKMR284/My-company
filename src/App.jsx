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

const heroImages = [
  {
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=88",
    eyebrow: "Strategy, design, and engineering · India",
    title: ["Build software", "that moves", "business forward."],
    copy: "We understand your technology needs and deliver tailored digital products for lasting impact.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=88",
    eyebrow: "Ideas into products · Together",
    title: ["Turn ideas", "into useful", "experiences."],
    copy: "From the first sketch to the final release, we make ambitious ideas clear, useful, and ready to grow.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=88",
    eyebrow: "Digital partners for bold teams",
    title: ["Make progress", "feel", "remarkable."],
    copy: "Senior thinking and thoughtful technology help your team move faster without losing the human detail.",
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
            loading="eager"
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
            into making them that way. We bring strategy, design, and
            engineering together to make complex things feel clear.
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
          Built for the
          <br />
          <em>bold</em> ones.
        </h2>
      </div>
      <ServiceList />
    </section>
  );
}

function WorkSection() {
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
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
