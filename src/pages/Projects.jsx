import { useEffect, useMemo, useState } from 'react';
import { FlapRow } from '../App';
import { PROJECTS, YEARS } from '../data/projects';

const ALL = "All";

function BoardRow({ project, number, onOpen }) {
  const { name, accolade, year, stack = [] } = project;
  const shown = stack.slice(0, 2);
  const extra = stack.length - shown.length;

  return (
    <div className="board-row">
      <button className="row-head flap-press" onClick={onOpen}>
        <span className="row-no">{String(number).padStart(2, "0")}</span>
        <span className="row-name">{name}</span>
        <span className="row-yearevent">{year}{accolade ? ` · ${accolade}` : ""}</span>
        <span className="row-stack">
          {shown.map((tech) => <span key={tech} className="row-chip">{tech}</span>)}
          {extra > 0 && <span className="row-chip row-chip-more">+{extra}</span>}
        </span>
        <span className="row-arrow">›</span>
      </button>
    </div>
  );
}

export default function Projects({ onBack, onOpenProject }) {
  const [tick, setTick] = useState(0);
  const [year, setYear] = useState(ALL);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 7500);
    return () => clearInterval(interval);
  }, []);

  const visible = useMemo(() => {
    return PROJECTS.filter((p) => year === ALL || String(p.year) === year);
  }, [year]);

  const filtered = visible.length !== PROJECTS.length;

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

        .flap-press:active {
          transform: translateY(1px) scaleY(0.93) !important;
          transition: transform 0.06s ease !important;
        }

        .back-btn {
          background: #25252a;
          color: #a0a0aa;
          border: 2px solid #35353a;
          padding: 6px 16px;
          cursor: pointer;
          font-family: inherit;
          font-weight: bold;
          font-size: 20px;
          width: fit-content;
          border-radius: 8px;
        }

        .filters-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
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

        .board-panel {
          border: 1px solid #25252a;
          border-radius: 8px;
          overflow: hidden;
          background: #111115;
        }
        .board-panel-head {
          display: flex;
          justify-content: space-between;
          padding: 14px 18px;
          border-bottom: 1px solid #25252a;
          color: #808088;
          font-size: 0.68rem;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .board-cols,
        .row-head {
          display: grid;
          grid-template-columns: 44px minmax(140px, 1.4fr) minmax(0, 1fr) minmax(0, 1fr) 20px;
          gap: 14px;
          align-items: center;
        }

        .board-cols {
          padding: 10px 18px;
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
        }

        .board-row {
          border-bottom: 1px solid #1c1c21;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .board-row:last-child {
          border-bottom: none;
        }
        .board-row:hover {
          background: rgba(255,255,255,0.015);
        }

        .row-head {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
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
        .board-row:hover .row-name {
          color: #f0f0f0;
        }
        .row-yearevent {
          color: #6a6a72;
          font-size: 0.7rem;
          font-weight: bold;
          letter-spacing: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
        .row-arrow {
          color: #55555e;
          font-size: 1rem;
          text-align: right;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .board-row:hover .row-arrow {
          color: #00ff00;
          transform: translateX(2px);
        }

        .board-empty {
          padding: 32px 20px;
          text-align: center;
          color: #6a6a72;
          font-size: 0.75rem;
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
            grid-template-columns: 40px minmax(0, 1fr) minmax(0, 1fr) 20px;
          }
          .board-cols .col-stack,
          .row-stack {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .projects-shell {
            padding: 12px !important;
          }
          .projects-card {
            padding: 20px 14px !important;
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
          .row-arrow { grid-column: 3; grid-row: 1; }
          .row-yearevent {
            grid-column: 2;
            grid-row: 2;
            font-size: 0.62rem;
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
          <button onClick={onBack} className="back-btn flap-press">
            BACK
          </button>

          <FlapRow key={tick} text="Projects" length={11} />

          <div className="filters-bar">
            <div className="chips">
              {[ALL, ...YEARS].map((option) => (
                <button
                  key={option}
                  className={`filter-btn flap-press ${year === option ? "active" : ""}`}
                  onClick={() => setYear(option)}
                  aria-pressed={year === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="board-panel">
            <div className="board-panel-head">
              <span>Board</span>
              <span>
                {String(visible.length).padStart(2, "0")}
                {filtered && <span className="progress-filtered"> / {PROJECTS.length}</span>} entries
              </span>
            </div>

            <div className="board-cols" aria-hidden="true">
              <span>No.</span>
              <span>Project</span>
              <span>Year/Event</span>
              <span className="col-stack">Stack</span>
              <span />
            </div>

            <div className="board">
              {visible.map((p) => (
                <BoardRow
                  key={p.slug}
                  project={p}
                  number={PROJECTS.indexOf(p) + 1}
                  onOpen={() => onOpenProject(p.slug)}
                />
              ))}

              {!visible.length && (
                <div className="board-empty">NO ENTRIES FOR THAT YEAR</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
