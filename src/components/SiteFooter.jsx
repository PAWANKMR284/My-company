import { Brand } from "./Brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Brand />
      <p>
        Thoughtful software for a<br />
        world in motion.
      </p>
      <div>
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </div>
      <small>© 2026 Pawan Tech Solution</small>
    </footer>
  );
}
