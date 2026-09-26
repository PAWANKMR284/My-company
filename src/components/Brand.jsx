export function Brand({ className = "" }) {
  return (
    <a className={`brand ${className}`.trim()} href="#top">
      <span className="brand-name">
        <span className="brand-initial">V</span>ayuLogic
      </span>
      <span className="brand-tagline">One-stop tech solution</span>
    </a>
  );
}

export function Eyebrow({ children, line = false }) {
  return (
    <p className="eyebrow">
      {line && <span className="eyebrow-line" />}
      {children}
    </p>
  );
}

export function TextLink({ children, className = "", href = "#contact" }) {
  return (
    <a className={`text-link ${className}`.trim()} href={href}>
      {children} <span>↗</span>
    </a>
  );
}
