import LineMark from "./LineMark";

export default function Fascia({ line, title, eyebrow, sub, hero = false, children }) {
  return (
    <section className={`fascia line-${line}${hero ? " fascia--hero" : ""}`}>
      <LineMark line={line} />
      <div className="fascia-text">
        {eyebrow && <p className="fascia-eyebrow">{eyebrow}</p>}
        <h1 className="fascia-name">{title}</h1>
        {sub && <p className="fascia-sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
