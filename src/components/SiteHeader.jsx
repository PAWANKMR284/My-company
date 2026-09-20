import { Link } from "react-router-dom";
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
        <Link to="/#services" onClick={onNavigate}>
          Services
        </Link>
        <Link to="/#work" onClick={onNavigate}>
          Work
        </Link>
        <Link to="/#about" onClick={onNavigate}>
          About
        </Link>
        <Link to="/blog" onClick={onNavigate}>
          Blog
        </Link>
        <Link className="nav-contact" to="/#contact" onClick={onNavigate}>
          Start a project <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
