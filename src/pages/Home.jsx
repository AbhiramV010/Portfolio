import { useEffect, useRef, useState } from "react";
import Fascia from "../components/Fascia";
import Train from "../components/Train";
import SystemMap from "../components/SystemMap";
import { Arrow } from "../components/icons";
import { RESUME_DRIVE_URL } from "../lines";
import "./Home.css";

const ROLES = ["High School Junior", "embedded systems", "software developer", "aircraft", "aspiring engineer"];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 17) return "Good afternoon!";
  return "Good evening!";
};

function useInterval(fn, ms) {
  const saved = useRef(fn);
  useEffect(() => {
    saved.current = fn;
  });
  useEffect(() => {
    const id = setInterval(() => saved.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
}

// 9x7 dot grid for the door-direction arrow.
const ARROW = [
  ".....#...",
  ".....##..",
  "########.",
  "#########",
  "########.",
  ".....##..",
  ".....#...",
];

function DotArrow() {
  return (
    <svg className="role-arrow" viewBox="0 0 9 7" aria-hidden="true">
      {ARROW.flatMap((row, y) =>
        [...row].map((c, x) => c === "#" && <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r="0.42" />)
      )}
    </svg>
  );
}

function Role() {
  const [i, setI] = useState(0);
  useInterval(() => setI((n) => (n + 1) % ROLES.length), 7000);
  return (
    <div className="role-screen">
      <DotArrow />
      <p className="role-text" key={i}>
        {ROLES[i]}
      </p>
    </div>
  );
}

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/AbhiramV010/",
    paths: [
      "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      "M9 18c-4.51 2-5-2-7-2",
    ],
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhiramv010/",
    paths: ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"],
    extra: (
      <>
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Devpost",
    href: "https://devpost.com/AbhiramV010",
    paths: ["M6 2h7.5L18 12l-4.5 10H6V2zm5 15h2l2.5-5L13 7h-2v10z"],
  },
];

const WAYS = [
  { key: "projects", label: "Projects", line: 2 },
  { key: "about", label: "About Me", line: 3 },
];

export default function Home({ onNavigate }) {
  return (
    <>
      <SystemMap />
      <Fascia hero line={1} eyebrow={getGreeting()} title="Abhiram Vadali">
        <Role />
      </Fascia>

      <div className="page home-page">
        <nav className="ways" aria-label="Destinations">
          {WAYS.map(({ key, label, line }) => (
            <button key={key} type="button" className={`way line-${line}`} onClick={() => onNavigate(key)}>
              <span className="way-label">{label}</span>
              <Arrow />
            </button>
          ))}
          <a className="way line-4" href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer">
            <span className="way-label">Resume</span>
            <Arrow dir="external" />
          </a>
        </nav>

        <div className="home-foot">
          <ul className="socials">
            {SOCIALS.map(({ label, href, paths, extra }) => (
              <li key={label}>
                <a className="social" href={href} target="_blank" rel="noopener noreferrer">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {paths.map((d) => (
                      <path key={d} d={d} />
                    ))}
                    {extra}
                  </svg>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="status">
            <span>OPEN TO OPPORTUNITIES</span>
          </div>
        </div>
      </div>

      <Train />
    </>
  );
}
