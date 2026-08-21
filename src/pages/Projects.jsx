import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { FlapRow } from '../App';
import PROJECTS from '../../projects.json';

const ALL = "ALL";
const YEARS = [ALL, ...[...new Set(PROJECTS.map(p => String(p.year)))].sort().reverse()];

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

// showHeader is false when the card is opened inside a board row: the row itself
// already carries the name and event, so repeating them would just be noise.
function ProjectCard({ name, flapLength, desc, event, stack, mediaSrc, actions = [], showHeader = true }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "16px"
      }}
    >
      {showHeader && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
          <h3 className="project-title" style={{
            color: "#f0f0f0",
            margin: 0,
            fontSize: "2.50rem",
            fontWeight: "bold",
            letterSpacing: "1px"
          }}>
            <FlapRow key={name} text={name} length={flapLength} />
          </h3>
          <span style={{ color: "#00ff00", fontSize: "0.9rem", fontWeight: "bold" }}>
            [{event}]
          </span>
        </div>
      )}

      <div className="project-body" style={{
        display: "grid",
        gridTemplateColumns: mediaSrc ? "1fr 1px 1fr" : "1fr",
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

        {mediaSrc && (
          <>
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
          </>
        )}
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

function BoardRow({ project, number, expanded, onToggle, rowRef }) {
  const { name, event, stack = [] } = project;
  const shown = stack.slice(0, 2);
  const extra = stack.length - shown.length;

  return (
    <div ref={rowRef} className={`board-row ${expanded ? "expanded" : ""}`}>
      <button
        className="row-head flap-press"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <span className="row-no">{String(number).padStart(2, "0")}</span>
        <span className="row-name">{name}</span>
        <span className="row-event">{event}</span>
        <span className="row-stack">
          {shown.map(tech => <span key={tech} className="row-chip">{tech}</span>)}
          {extra > 0 && <span className="row-chip row-chip-more">+{extra}</span>}
        </span>
        <span className="row-caret">{expanded ? "▾" : "▸"}</span>
      </button>

      {expanded && (
        <div className="row-detail">
          <ProjectCard {...project} showHeader={false} />
        </div>
      )}
    </div>
  );
}

export default function Projects({ onBack }) {
  const [tick, setTick] = useState(0);
  const [openName, setOpenName] = useState(PROJECTS[0].name);
  const [year, setYear] = useState(ALL);

  const openRef = useRef(null);
  const shouldScroll = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 7500);
    return () => clearInterval(interval);
  }, []);

  const visible = useMemo(
    () => PROJECTS.filter(p => year === ALL || String(p.year) === year),
    [year]
  );

  // If the year filter hides the open project, fall back to the first row that
  // is still on the board rather than writing state back during render.
  const matchPos = visible.findIndex(p => p.name === openName);
  const openPos = matchPos >= 0 ? matchPos : 0;
  const open = visible.length ? visible[openPos] : null;

  // Scrolling is a DOM side effect, and only wanted for navigation the user
  // actually triggered -- never on first paint.
  useEffect(() => {
    if (!shouldScroll.current) return;
    shouldScroll.current = false;
    openRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [open]);

  const toggle = useCallback((name) => {
    shouldScroll.current = true;
    setOpenName(name);
  }, []);

  const step = useCallback((delta) => {
    if (!open || visible.length < 2) return;
    const from = visible.findIndex(p => p.name === open.name);
    const to = (from + delta + visible.length) % visible.length;
    shouldScroll.current = true;
    setOpenName(visible[to].name);
  }, [open, visible]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") step(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [step]);

  const isFiltered = visible.length !== PROJECTS.length;

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

        .tech-tag {
          transition: transform 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .tech-tag:hover {
          transform: translateY(-2px);
          border-color: #00ff00;
          color: #00ff00;
        }

        .project-media {
          transition: transform 0.4s ease, border-color 0.4s ease;
        }
        .project-media:hover {
          transform: scale(1.01);
          border-color: #00ff00;
        }

        /* --- board chrome --- */

        .board-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .board-filters {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .board-legend {
          color: #4a4a52;
          font-size: 0.62rem;
          letter-spacing: 2px;
          font-weight: bold;
        }
        .filter-btn {
          background: linear-gradient(to bottom, #151518 49%, #0b0b0d 51%);
          border: 1px solid #25252a;
          border-radius: 4px;
          color: #808088;
          font-family: inherit;
          font-size: 0.68rem;
          font-weight: bold;
          letter-spacing: 1.5px;
          padding: 6px 12px;
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .filter-btn:hover {
          border-color: #45454d;
          color: #b0b0b8;
        }
        .filter-btn.active {
          border-color: #00ff00;
          color: #00ff00;
        }

        .board-cols,
        .row-head {
          display: grid;
          grid-template-columns: 44px minmax(120px, 1.3fr) minmax(0, 1.5fr) minmax(0, 1fr) 20px;
          gap: 14px;
          align-items: center;
        }

        .board-cols {
          padding: 0 16px 8px;
          border-bottom: 1px dashed #22222a;
          color: #4a4a52;
          font-size: 0.6rem;
          letter-spacing: 2px;
          font-weight: bold;
        }
        .board-cols .col-stack {
          text-align: right;
        }

        .board {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .board-row {
          border: 1px solid #25252a;
          border-radius: 6px;
          overflow: hidden;
          background: linear-gradient(to bottom, #151518 49%, #0b0b0d 51%);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .board-row:hover {
          border-color: #45454d;
        }
        .board-row.expanded {
          border-color: #00ff00;
          box-shadow: inset 3px 0 0 #00ff00, 0 0 18px rgba(0, 255, 0, 0.07);
        }

        .row-head {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 16px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          position: relative;
        }
        /* the flap seam, same trick as .flap-cell */
        .row-head::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(0, 0, 0, 0.55);
          pointer-events: none;
        }

        .row-no {
          color: #00ff00;
          font-size: 0.72rem;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .row-name {
          color: #d8d8de;
          font-weight: bold;
          font-size: 1rem;
          letter-spacing: 0.5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }
        .board-row:hover .row-name,
        .board-row.expanded .row-name {
          color: #f0f0f0;
        }
        .board-row.expanded .row-name {
          text-shadow: 0 0 14px rgba(0, 255, 0, 0.3);
        }
        .row-event {
          color: #6a6a72;
          font-size: 0.7rem;
          font-weight: bold;
          letter-spacing: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s ease;
        }
        .board-row.expanded .row-event {
          color: #00ff00;
        }
        .row-stack {
          display: flex;
          gap: 5px;
          justify-content: flex-end;
          white-space: nowrap;
          overflow: hidden;
        }
        .row-chip {
          font-size: 0.6rem;
          color: #7a7a82;
          border: 1px solid #2c2c33;
          border-radius: 3px;
          padding: 2px 6px;
        }
        .row-chip-more {
          color: #55555e;
        }
        .row-caret {
          color: #55555e;
          font-size: 0.7rem;
          text-align: right;
          transition: color 0.2s ease;
        }
        .board-row.expanded .row-caret {
          color: #00ff00;
        }

        .row-detail {
          padding: 18px 20px 20px;
          border-top: 1px dashed #22222a;
          transform-origin: top center;
          animation: flapOpen 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes flapOpen {
          from { opacity: 0; transform: perspective(900px) rotateX(-8deg); }
          to { opacity: 1; transform: perspective(900px) rotateX(0deg); }
        }

        .board-empty {
          border: 1px dashed #25252a;
          border-radius: 6px;
          padding: 32px 20px;
          text-align: center;
          color: #6a6a72;
          font-size: 0.75rem;
          letter-spacing: 2px;
          font-weight: bold;
        }

        .board-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px dashed #25252a;
        }
        .board-nav-btn {
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
        .board-nav-btn:hover {
          border-color: #00ff00;
          color: #00ff00;
          transform: translateY(-2px);
        }
        .board-progress {
          color: #808088;
          font-size: 0.8rem;
          letter-spacing: 2px;
          font-weight: bold;
        }
        .progress-filtered {
          color: #00ff00;
          letter-spacing: 1px;
        }

        @media (max-width: 860px) {
          .board-cols,
          .row-head {
            grid-template-columns: 40px minmax(0, 1fr) minmax(0, 1.2fr) 20px;
          }
          .board-cols .col-stack,
          .row-stack {
            display: none;
          }
        }

        @media (max-width: 720px) {
          .project-body {
            grid-template-columns: 1fr !important;
          }
          .project-divider {
            display: none;
          }
          .board-cols {
            display: none;
          }
          .row-head {
            grid-template-columns: 36px 1fr 20px;
            gap: 10px;
            row-gap: 3px;
          }
          .row-no { grid-column: 1; grid-row: 1; }
          .row-name { grid-column: 2; grid-row: 1; }
          .row-caret { grid-column: 3; grid-row: 1; }
          .row-event {
            grid-column: 2;
            grid-row: 2;
            font-size: 0.62rem;
          }
        }

        @media (max-width: 600px) {
          .projects-shell {
            padding: 12px !important;
          }
          .projects-card {
            padding: 20px 14px !important;
          }
          .row-detail {
            padding: 14px 12px 16px;
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

          <div className="board-bar">
            <span className="board-legend">
              {String(visible.length).padStart(2, "0")} ENTRIES
              {isFiltered && <span className="progress-filtered"> / {PROJECTS.length}</span>}
            </span>

            {YEARS.length > 2 && (
              <div className="board-filters">
                <span className="board-legend">YEAR</span>
                {YEARS.map(y => (
                  <button
                    key={y}
                    className={`filter-btn flap-press ${year === y ? "active" : ""}`}
                    onClick={() => setYear(y)}
                    aria-pressed={year === y}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="board-cols" aria-hidden="true">
              <span>NO.</span>
              <span>PROJECT</span>
              <span>EVENT</span>
              <span className="col-stack">STACK</span>
              <span />
            </div>

            <div className="board" style={{ paddingTop: "8px" }}>
              {visible.map(p => (
                <BoardRow
                  key={p.name}
                  project={p}
                  number={PROJECTS.indexOf(p) + 1}
                  expanded={p.name === open?.name}
                  rowRef={p.name === open?.name ? openRef : null}
                  onToggle={() => toggle(p.name)}
                />
              ))}

              {!visible.length && (
                <div className="board-empty">NO ENTRIES FOR THAT YEAR</div>
              )}
            </div>
          </div>

          {open && (
            <div className="board-foot">
              <button className="board-nav-btn flap-press" onClick={() => step(-1)}>&uarr; PREV</button>
              <span className="board-progress">
                {String(openPos + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </span>
              <button className="board-nav-btn flap-press" onClick={() => step(1)}>NEXT &darr;</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
