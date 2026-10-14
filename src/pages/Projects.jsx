import { useMemo, useState } from "react";
import Fascia from "../components/Fascia";
import BackButton from "../components/BackButton";
import { Arrow } from "../components/icons";
import { PROJECTS, YEARS } from "../data/projects";
import "./Projects.css";

const ALL = "All";

function Stop({ project, number, index, first, last, onOpen }) {
  const { name, accolade, year, stack = [] } = project;
  const shown = stack.slice(0, 2);
  const extra = stack.length - shown.length;

  return (
    <li
      className={`stop${accolade ? " stop--interchange" : ""}${first ? " is-first" : ""}${last ? " is-last" : ""}`}
      style={{ "--n": index }}
    >
      <button type="button" className="stop-btn" onClick={onOpen}>
        <span className="stop-no">{String(number).padStart(2, "0")}</span>
        <span className="stop-marker" aria-hidden="true" />
        <span className="stop-name">{name}</span>
        <span className="stop-meta">{year}{accolade ? ` · ${accolade}` : ""}</span>
        <span className="stop-stack">
          {shown.map((tech) => <span key={tech} className="tag">{tech}</span>)}
          {extra > 0 && <span className="tag tag--more">+{extra}</span>}
        </span>
        <Arrow className="stop-arrow" />
      </button>
    </li>
  );
}

export default function Projects({ onBack, onOpenProject }) {
  const [year, setYear] = useState(ALL);

  const visible = useMemo(() => PROJECTS.filter((p) => year === ALL || String(p.year) === year), [year]);
  const filtered = visible.length !== PROJECTS.length;

  return (
    <>
      <Fascia line={2} title="Projects" />

      <div className="page">
        <BackButton onBack={onBack} />

        <div className="chips" role="group" aria-label="Filter by year">
          {[ALL, ...YEARS].map((option) => (
            <button
              key={option}
              type="button"
              className="chip"
              onClick={() => setYear(option)}
              aria-pressed={year === option}
            >
              {option}
            </button>
          ))}
        </div>

        <section className="panel board">
          <div className="panel-head">
            <span>Board</span>
            <span>
              {String(visible.length).padStart(2, "0")}
              {filtered && <span className="board-total"> / {PROJECTS.length}</span>} entries
            </span>
          </div>

          <div className="board-cols" aria-hidden="true">
            <span>No.</span>
            <span />
            <span>Project</span>
            <span>Year/Event</span>
            <span className="col-stack">Stack</span>
            <span />
          </div>

          <ol className="stops">
            {visible.map((p, i) => (
              <Stop
                key={p.slug}
                project={p}
                number={PROJECTS.indexOf(p) + 1}
                index={i}
                first={i === 0}
                last={i === visible.length - 1}
                onOpen={() => onOpenProject(p.slug)}
              />
            ))}
          </ol>

          {!visible.length && <div className="board-empty">NO ENTRIES FOR THAT YEAR</div>}
        </section>
      </div>
    </>
  );
}
