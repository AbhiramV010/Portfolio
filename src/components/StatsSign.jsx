import { Arrow } from "./icons";
import { PROJECTS } from "../data/projects";

const PODIUM = /\b(1st|2nd|3rd) place\b/i;

const STARTED_CODING = 2019;

const STATS = [
  { value: new Date().getFullYear() - STARTED_CODING, label: "Years coding" },
  { value: PROJECTS.length, label: "Projects built" },
  { value: PROJECTS.filter((p) => String(p.event).trim() !== String(p.year)).length, label: "Competitions" },
  { value: PROJECTS.filter((p) => PODIUM.test(p.event)).length, label: "Podium finishes" },
];

export default function StatsSign() {
  return (
    <aside className="station-sign line-1" aria-label="Stats">
      <div className="sign-head">
        <Arrow />
        <span>Abhiram's Stats</span>
      </div>
      <dl className="sign-grid">
        {STATS.map(({ value, label }) => (
          <div key={label} className="sign-cell">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
