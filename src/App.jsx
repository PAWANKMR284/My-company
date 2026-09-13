import { useState } from "react";
import "./App.css";
import { ContactForm } from "./components/ContactForm";
import { Eyebrow, TextLink } from "./components/Brand";
import { FaqList } from "./components/FaqList";
import { IndustryTabs } from "./components/IndustryTabs";
import { ProjectGrid } from "./components/ProjectGrid";
import { ServiceList } from "./components/ServiceList";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

function Hero() {
  return (
    <section className="hero section-pad">
      <div className="hero-copy reveal">
        <Eyebrow line>Custom software development partner · India</Eyebrow>
        <h1>Build software<br /><em>that moves</em><br />business forward.</h1>
        <p className="hero-intro">We understand your technology needs and deliver tailored digital products for lasting impact.</p>
        <a className="circle-link" href="#contact" aria-label="Start a project">↘</a>
      </div>
      <div className="hero-visual reveal reveal-delay">
        <div className="hero-ring" />
      </div>
      <div className="hero-footer"><span>01 / 04</span><span className="hero-rule" /><span>Scroll to explore ↓</span></div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="intro section-pad" id="about">
      <Eyebrow>Why Pawan Tech Solution</Eyebrow>
      <div className="intro-grid">
        <h2>Good software<br />starts with <em>clarity.</em></h2>
        <div>
          <p className="lead">The best digital products feel simple because a lot of care went into making them that way. We bring strategy, design, and engineering together to make complex things feel clear.</p>
          <TextLink>More about us</TextLink>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="services section-pad" id="services">
      <div className="section-heading"><Eyebrow>What we do</Eyebrow><h2>Built for the<br /><em>bold</em> ones.</h2></div>
      <ServiceList />
    </section>
  );
}

function WorkSection() {
  return (
    <section className="work section-pad" id="work">
      <div className="section-heading work-heading">
        <div><Eyebrow>Selected work</Eyebrow><h2>Ideas into<br /><em>impact.</em></h2></div>
        <TextLink className="light-link">View all work</TextLink>
      </div>
      <ProjectGrid />
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="industries section-pad">
      <div className="industry-head">
        <div><Eyebrow>Across industries</Eyebrow><h2>Different worlds.<br /><em>One standard.</em></h2></div>
        <p>Deep enough to understand your context. Curious enough to challenge it.</p>
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
    <section className="numbers section-pad">
      <Eyebrow>A small studio. A big point of view.</Eyebrow>
      <div className="number-grid">
        {numbers.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="faq section-pad">
      <div className="faq-intro">
        <Eyebrow>Good to know</Eyebrow>
        <h2>Questions,<br /><em>answered.</em></h2>
        <p>Still curious? We like curious people.</p>
        <TextLink>Ask us anything</TextLink>
      </div>
      <FaqList />
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-copy">
        <Eyebrow>Have a good one?</Eyebrow>
        <h2>Let&apos;s make<br />something <em>matter.</em></h2>
        <p>Share a little about your challenge, your idea, or just say hello.</p>
        <a href="mailto:hello@pawantechsolution.com" className="email-link">hello@pawantechsolution.com <span>↗</span></a>
      </div>
      <ContactForm />
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <SiteHeader menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)} onNavigate={closeMenu} />
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
