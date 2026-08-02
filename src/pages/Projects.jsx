import { useState, useEffect, useCallback } from 'react';
import { FlapRow } from '../App';

function LinkButton({ label, href }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "transparent",
        color: hover ? "#00ff00" : "#a0a0aa",
        border: `2px solid ${hover ? "#00ff00" : "#35353a"}`,
        padding: "8px 16px",
        cursor: "pointer",
        fontFamily: '"Courier New", Courier, monospace',
        fontWeight: "bold",
        fontSize: "1.1rem",
        borderRadius: "6px",
        width: "fit-content",
        textDecoration: "none",
        display: "inline-block",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease"
      }}
    >
      {label}
    </a>
  );
}

function ProjectCard({ name, flapLength, desc, event, stack, mediaSrc, actions = [] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "16px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
        <h3 className="project-title" style={{
          color: "#f0f0f0",
          margin: 0,
          fontSize: "2.50rem",
          fontWeight: "bold",
          letterSpacing: "1px",
          transition: "color 0.3s ease, text-shadow 0.3s ease"
        }}>
          <FlapRow key={name} text={name} length={flapLength} />
        </h3>
        <span style={{
          color: "#00ff00",
          fontSize: "0.9rem",
          fontWeight: "bold"
        }}>
          [{event}]
        </span>
      </div>

      <div className="project-body" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1px 1fr",
        gap: "24px",
        alignItems: "center",
        flexGrow: 1
      }}>
        <div style={{
          color: "#a0a0aa",
          margin: 0,
          fontSize: "1.0rem",
          lineHeight: "1.6",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          textAlign: "left"
        }}>
          <div>{desc}</div>

          {actions.length > 0 && (
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
              {actions.map((act, i) => (
                <LinkButton key={i} label={act.label} href={act.href} />
              ))}
            </div>
          )}
        </div>

        <div className="project-divider" style={{ borderLeft: "1px dashed #25252a", height: "100%", alignSelf: "stretch" }} />

        <div className="project-media" style={{
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          borderRadius: "4px",
          border: "1px solid #25252a",
          background: "#0d0d11",
          position: "relative"
        }}>
          <iframe
            src={mediaSrc}
            style={{ width: "100%", height: "100%", border: "none" }}
            title={name}
            allowFullScreen
            allow="autoplay"
          />
        </div>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "12px",
        borderTop: "1px dashed #25252a"
      }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {stack.map((tech, i) => (
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
    </div>
  );
}

const PROJECTS = [
  {
    name: "Autovision",
    flapLength: 10,
    desc: "An automated 360° optical inspection rig built on macOS using an Arduino Uno to drive three servos and a stepper motor for cycling through top, side, and back-side views. Captured multi-angle frames are sent as a single payload to Gemini 2.5 Flash for automated circuit defect detection. Features a Streamlit interface with manual slider controls for precise motor and angle adjustments.",
    event: "3RD PLACE - 2026",
    mediaSrc: "https://www.youtube.com/embed/toAHYdpgcuI?si=aw7zStHxfNgl8Pxl",
    stack: ["Python", "Arduino Uno R3", "Streamlit", "Gemini 2.5 Flash", "OpenCV"],
    actions: [{ label: "Source Code", href: "https://github.com/AbhiramV010/HTVHackDay26" }]
  },
  {
    name: "Halo Assistant",
    flapLength: 14,
    desc: "An ElectronJS application designed for JecHacks 2026 to act as an AI assistant that teaches anything. It achieves this by drawing over the user's screen at 60FPS using a canvas overlay (numbers, text, & diagrams). Halo can even move the user's mouse to perform actions for them.",
    event: "JecHacks 2026 - 2nd Place",
    mediaSrc: "https://www.youtube.com/embed/nmboKJn2uPU?si=SmoHfkn-xNq3Dc03",
    stack: ["Electron JS", "HTML/CSS", "Anthropic API", "ElevenLabs TTS & STT", "nut-js"],
    actions: [{ label: "Source Code", href: "https://github.com/AbhiramV010/Halo_JecHacks26" }]
  },
  {
    name: "Iris-Lite",
    flapLength: 9,
    desc: "A lightweight surveillance prototype built on the Raspberry Pi 4B. Uses a set of Python scripts for event detection and PELICAN compression software. Features 3 main edge-algorithms: a sound monitor, zone monitor, and detector pipeline, backed by a carbon-aware charging circuit.",
    event: "STEAM IC 2026",
    mediaSrc: "https://drive.google.com/file/d/1iu30qux5kQ2zjUnPXFTFPc-80SM9EFUX/preview",
    stack: ["Python 3.12.7", "Linux Shell", "Raspberry Pi", "C++"],
    actions: [
      { label: "Source Code", href: "https://github.com/AbhiramV010/Iris-Lite" },
      { label: "Website", href: "https://abhiramv010.github.io/Iris_Lite/" }
    ]
  },
  {
    name: "EZ-Volunteer Sys",
    flapLength: 16,
    desc: "A platform designed to centralize the tracking of volunteer hours to replace error-prone manual spreadsheet tracking at a local organization.",
    event: "2025",
    mediaSrc: "https://www.youtube.com/embed/2Gg6Seob5Mg?si=_j7NInFeVUWIhP3j",
    stack: ["Python 3", "React", "Node.js", "FastAPI", "PostgreSQL"],
    actions: [{ label: "Source Code", href: "https://github.com/AbhiramV010/volunteersys-web" }]
  }
];

export default function Projects({ onBack }) {
  const [tick, setTick] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 7500);
    return () => clearInterval(interval);
  }, []);

  const goTo = useCallback((idx) => {
    setActiveIndex(prev => {
      if (idx === prev) return prev;
      setDirection(idx > prev ? 1 : -1);
      return idx;
    });
  }, []);

  const goPrev = useCallback(() => goTo((activeIndex - 1 + PROJECTS.length) % PROJECTS.length), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo((activeIndex + 1) % PROJECTS.length), [activeIndex, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  const active = PROJECTS[activeIndex];

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

        .nav-flap {
          transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .nav-flap:hover {
          border-color: #00ff00 !important;
          transform: translateY(-2px);
        }

        .project-entry:hover .project-title {
          color: #00ff00;
          text-shadow: 0 0 14px rgba(0, 255, 0, 0.35);
        }

        .project-media {
          transition: transform 0.4s ease, border-color 0.4s ease;
        }
        .project-entry:hover .project-media {
          transform: scale(1.015);
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

        .project-tabs {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .project-tabs::-webkit-scrollbar { display: none; }

        .project-tab {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 16px;
          border-radius: 8px;
          border: 2px solid #25252a;
          background: #16161a;
          color: #a0a0aa;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .project-tab:hover {
          border-color: #45454d;
          transform: translateY(-2px);
        }
        .project-tab.active {
          border-color: #00ff00;
          color: #f0f0f0;
        }
        .project-tab .tab-index {
          font-size: 0.65rem;
          color: #00ff00;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .project-tab .tab-name {
          font-size: 0.9rem;
          font-weight: bold;
          white-space: nowrap;
        }

        .project-frame {
          animation-duration: 0.45s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: both;
          border: 2px solid #25252a;
          border-radius: 12px;
          padding: 28px;
          background: #0d0d11;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 2px rgba(255,255,255,0.05);
          transition: border-color 0.3s ease;
        }
        .project-frame:hover {
          border-color: #00ff00;
        }
        .project-frame.dir-next {
          animation-name: slideInRight;
        }
        .project-frame.dir-prev {
          animation-name: slideInLeft;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: perspective(1600px) rotateY(-14deg) translateX(40px); }
          to { opacity: 1; transform: perspective(1600px) rotateY(0deg) translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: perspective(1600px) rotateY(14deg) translateX(-40px); }
          to { opacity: 1; transform: perspective(1600px) rotateY(0deg) translateX(0); }
        }

        .project-nav-btn {
          background: transparent;
          border: 2px solid #25252a;
          color: #a0a0aa;
          font-family: inherit;
          font-weight: bold;
          font-size: 0.85rem;
          letter-spacing: 1px;
          padding: 8px 18px;
          border-radius: 6px;
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
        }
        .project-nav-btn:hover {
          border-color: #00ff00;
          color: #00ff00;
          transform: translateY(-2px);
        }

        .project-progress {
          color: #808088;
          font-size: 0.8rem;
          letter-spacing: 2px;
          font-weight: bold;
        }

        @media (max-width: 720px) {
          .project-body {
            grid-template-columns: 1fr !important;
          }
          .project-divider {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .projects-shell {
            padding: 12px !important;
          }
          .projects-card {
            padding: 20px 14px !important;
          }
          .project-frame {
            padding: 18px !important;
          }
          .project-title {
            font-size: 1.8rem !important;
          }
        }
      `}</style>

      <div className="projects-shell" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: "24px" }}>
        <div className="projects-card" style={{
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
        }}>
          <button
            onClick={onBack}
            className="flap-press"
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
          >
            BACK
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FlapRow key={tick} text="My Projects" length={11} />
          </div>

          <div className="project-tabs">
            {PROJECTS.map((p, i) => (
              <button
                key={p.name}
                className={`project-tab flap-press ${i === activeIndex ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-selected={i === activeIndex}
              >
                <span className="tab-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="tab-name">{p.name}</span>
              </button>
            ))}
          </div>

          <div key={activeIndex} className={`project-entry project-frame dir-${direction === 1 ? "next" : "prev"}`}>
            <ProjectCard {...active} />
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "12px",
            borderTop: "1px dashed #25252a"
          }}>
            <button className="project-nav-btn flap-press" onClick={goPrev}>&larr; PREV</button>
            <span className="project-progress">
              {String(activeIndex + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <button className="project-nav-btn flap-press" onClick={goNext}>NEXT &rarr;</button>
          </div>
        </div>
      </div>
    </>
  );
}
