export function Brand({ className = "" }) {
  return (
    <a
      className={`brand ${className}`.trim()}
      href="#top"
      aria-label="pawan tech solution, home"
    >
      <span>pawan</span>{" "}
      <b>
        tech <br />
        solution
      </b>
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
