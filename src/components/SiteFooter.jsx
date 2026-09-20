import { Link } from "react-router-dom";
import { Brand } from "./Brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Brand />
          <p>
            Thoughtful software for a<br />
            world in motion.
          </p>
        </div>
        <div className="footer-links-block">
          <p className="footer-label">Explore</p>
          <nav aria-label="Footer navigation">
            <Link to="/#about">About</Link>
            <Link to="/#services">Services</Link>
            <Link to="/#work">Work</Link>
            <Link to="/#contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-contact-block">
          <p className="footer-label">Start a conversation</p>
          <a className="footer-email" href="mailto:pwnkumar284@gmail.com">
            pwnkumar284@gmail.com <span>↗</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© 2026 Pawan Tech Solution. All rights reserved.</small>
        <span>Built with care in India</span>
        <a className="back-to-top" href="#top" aria-label="Back to top">
          ↑ <span>Back to top</span>
        </a>
      </div>
    </footer>
  );
}
