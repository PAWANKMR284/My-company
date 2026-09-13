import { Brand } from "./Brand";

export function SiteHeader({ menuOpen, onMenuToggle, onNavigate }) {
  return (
    <header className="site-header">
      <Brand />
      <button
        className="menu-toggle"
        onClick={onMenuToggle}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
      </button>
      <nav className={menuOpen ? "main-nav open" : "main-nav"}>
        <a href="#services" onClick={onNavigate}>
          Services
        </a>
        <a href="#work" onClick={onNavigate}>
          Work
        </a>
        <a href="#about" onClick={onNavigate}>
          About
        </a>
        <a className="nav-contact" href="#contact" onClick={onNavigate}>
          Start a project <span>↗</span>
        </a>
      </nav>
    </header>
  );
}
