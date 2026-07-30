import { useState, useEffect, useRef } from 'react';
import { FlapRow } from '../App';

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function InfoCard({ title, children, fw }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`info-entry ${visible ? "visible" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}
    >
      <h3 style={{
        color: "#f0f0f0",
        margin: 0,
        fontSize: "1.75rem",
        fontWeight: "bold",
        letterSpacing: "1px",
        borderBottom: "1px dashed #25252a",
        paddingBottom: "12px"
      }}>
        {<FlapRow key={1000} text={title} length={fw} />}
      </h3>
      <div style={{ color: "#a0a0aa", fontSize: "1.0rem", lineHeight: "1.6" }}>
        {children}
      </div>
    </div>
  );
}

function SkillGroup({ category, items }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`skill-group ${visible ? "visible" : ""}`}>
      <div style={{ color: "#00ff00", fontWeight: "bold", fontSize: "0.9rem", marginBottom: "10px" }}>
        [{category}]
      </div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {items.map((tech, i) => (
          <span key={i} className="tech-tag" style={{
            background: "transparent",
            color: "#b0b0b8",
            fontSize: "0.75rem",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "1px solid #303036"
          }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ item, index, hoveredIndex, setHoveredIndex }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`timeline-row ${item.highlight ? 'active' : ''} ${visible ? 'visible' : ''}`}
    >
      <div className="timeline-indicator" />

      <div className="timeline-content">
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ color: "#f0f0f0", fontWeight: "bold", fontSize: "1.2rem" }}>
              {item.event}
            </span>
          </div>

          <span style={{ color: "#00ff00", fontSize: "0.85rem", marginTop: "4px", fontWeight: "500" }}>
            {item.subtitle}
          </span>

          <button
            type="button"
            className="read-more-btn"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index ? "READ LESS -" : "READ MORE +"}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", maxWidth: "50%" }}>
          <span style={{
            border: `1px solid ${item.highlight ? '#00ff00' : '#25252a'}`,
            color: item.highlight ? '#00ff00' : '#a0a0aa',
            fontSize: "0.65rem",
            fontWeight: "bold",
            padding: "2px 8px",
            borderRadius: "4px",
            letterSpacing: "1px"
          }}>
            {item.date}
          </span>

          <div className={`timeline-detail ${hoveredIndex === index ? 'open' : ''}`}>
            <span style={{
              color: "#b0b0b8",
              fontSize: "0.85rem",
              fontFamily: '"Courier New", Courier, monospace',
              display: "block",
              textAlign: "right"
            }}>
              {item.detail}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About({ onBack }) {
  const [tick, setTick] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 7500);
    return () => clearInterval(interval);
  }, []);

  const skillGroups = [
    { category: "Frontend", items: ["React.js", "HTML", "CSS", "Java Swing", "CustomTkinter"] },
    { category: "Backend", items: ["Python 3", "Node.js", "FastAPI", "PostgreSQL", "Java 21"]},
    { category: "Hardware", items: ["KiCad", "AVR/C", "Arduino", "Raspberry Pi"]}
  ];

  const timeline = [
      { date: "Jul 2026 - Present", event: "ZRA Labs", subtitle: "As a summer intern, I was tasked with creating a Computer-Vision Model that identifies different railway-related objects. It will operate as a prototype for ZRA's future demonstrations and product.", highlight: true},
    { date: "Sep 2025 - Jun 2026", event: "Campion STEAM IC", subtitle: "Chapter Executive & Participant", detail: "Guided students in building projects under the Computer Science event. Built the Iris-Lite for 2026", highlight: false},
    { date: "Sep 2025 - Jan 2026", event: "Brampton FBLC, JEC & TA", subtitle: "Systems Executive", detail: "Worked with a team of programmers to design the organization's landing page", highlight: false},
  ];

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: #0a0a0c;
          font-family: "Courier New", Courier, monospace;
          overflow-x: hidden;
        }

        .flap-cell {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(18px, 4.5vw, 36px);
          height: clamp(30px, 6vw, 50px);
          font-size: clamp(1rem, 3vw, 1.6rem);
          background: linear-gradient(to bottom, #151518 49%, #000000 51%);
          color: #f0f0f0;
          font-weight: bold;
          border-radius: 8px;
          border: 1px solid #25252a;
          box-shadow: inset 0 0 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.5);
          position: relative;
        }

        .flap-cell::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(0, 0, 0, 0.7);
        }

        .info-entry {
          padding-top: 32px;
          border-top: 1px dashed #25252a;
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .info-entry:first-child {
          padding-top: 0;
          border-top: none;
        }
        .info-entry.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-group {
          border-left: 2px solid #25252a;
          padding-left: 16px;
          opacity: 0;
          transform: translateX(-16px);
          transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease;
        }
        .skill-group.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .skill-group:hover {
          border-color: #00ff00;
        }

        .tech-tag {
          transition: transform 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .tech-tag:hover {
          transform: translateY(-2px);
          border-color: #00ff00;
          color: #00ff00;
        }

        .timeline-wrapper {
          display: flex;
          position: relative;
          padding-left: 32px;
          flex-direction: column;
          gap: 0;
        }

        .timeline-axis {
          position: absolute;
          left: 10px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #1e1e24;
        }

        .timeline-row {
          display: flex;
          position: relative;
          align-items: center;
          width: 100%;
          padding: 20px 0;
          border-bottom: 1px dashed #1e1e24;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .timeline-row:last-child {
          border-bottom: none;
        }
        .timeline-row.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline-indicator {
          position: absolute;
          left: -32px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #111115;
          border: 2px solid #25252a;
          box-sizing: border-box;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }

        .timeline-row.active .timeline-indicator {
          border-color: #00ff00;
          background: #00ff00;
          box-shadow: 0 0 12px rgba(0, 255, 0, 0.4);
        }

        .timeline-row:hover .timeline-indicator {
          transform: scale(1.2);
          border-color: #00ff00;
        }

        .timeline-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          box-sizing: border-box;
          transition: transform 0.3s ease;
        }

        .timeline-row:hover .timeline-content {
          transform: translateX(4px);
        }

        .read-more-btn {
          background: transparent;
          border: none;
          color: #a0a0aa;
          font-family: "Courier New", Courier, monospace;
          font-size: 0.75rem;
          font-weight: bold;
          letter-spacing: 1px;
          cursor: pointer;
          padding: 0;
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          transition: color 0.15s ease;
        }

        .read-more-btn:hover {
          color: #00ff00;
        }

        .timeline-detail {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s ease, margin-top 0.35s ease;
        }
        .timeline-detail.open {
          max-height: 120px;
          opacity: 1;
          margin-top: 6px;
        }
      `}</style>

      <div style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: "24px" }}>
        <div style={{
          background: "#111115",
          padding: "30px",
          borderRadius: "12px",
          boxSizing: "border-box",
          boxShadow: "0 20px 50px rgba(0,0,0,0.7), inset 0 0 2px rgba(255,255,255,0.1)",
          border: "4px solid #1a1a22",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
          minHeight: "calc(100vh - 48px)",
        }}>
          <button
            onClick={onBack}
            style={{
              marginTop: "20px",
              background: "#25252a",
              color: "#a0a0aa",
              border: "2px solid #35353a",
              padding: "6px 16px",
              cursor: "pointer",
              fontFamily: '"Courier New", Courier, monospace',
              fontWeight: "bold",
              fontSize: 20,
              width: "fit-content",
              alignSelf: "flex-start",
              borderRadius: "8px"
            }}
          > BACK
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FlapRow key={tick} text="About Me" length={8} />
            <br />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

            <InfoCard title="" fw={0}>
              I am a developer and aspiring electrical engineer.
              I build custom circuit boards, write low-level code,
              and design software solutions to solve complex physical problems.
            </InfoCard>

            <InfoCard title="My Developer Stack" fw = {18}>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px"
              }}>
                {skillGroups.map((group, index) => (
                  <SkillGroup key={index} category={group.category} items={group.items} />
                ))}
              </div>
            </InfoCard>

            <InfoCard title="Experience" fw={10}>
              <div className="timeline-wrapper">
                <div className="timeline-axis" />
                {timeline.map((item, index) => (
                  <TimelineRow
                    key={index}
                    item={item}
                    index={index}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                  />
                ))}
              </div>
            </InfoCard>

          </div>
        </div>
      </div>
    </>
  );
}
