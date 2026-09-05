import { useEffect, useRef, useState } from "react";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";

const SHUTTER_COLS = 14;

function BoardShutter({ active }) {
  if (!active) return null;
  return (
    <div className="board-shutter" aria-hidden="true">
      {Array.from({ length: SHUTTER_COLS }).map((_, i) => (
        <div key={i} className="board-shutter-col" style={{ animationDelay: `${i * 18}ms` }} />
      ))}
    </div>
  );
}

export function ShutterStyles() {
  return (
    <style>{`
      .board-shutter {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        pointer-events: none;
      }
      .board-shutter-col {
        flex: 1 1 0;
        background: linear-gradient(to bottom, #131316 49%, #050506 51%);
        border-left: 1px solid #000;
        box-shadow: inset 0 0 12px rgba(0,0,0,0.6);
        transform: translateY(-100%);
        animation-name: shutterSweep;
        animation-duration: 0.76s;
        animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
        animation-fill-mode: forwards;
      }
      .board-shutter-col:first-child { border-left: none; }
      @keyframes shutterSweep {
        0% { transform: translateY(-100%); }
        50% { transform: translateY(0%); }
        100% { transform: translateY(100%); }
      }

      .board-ambient {
        position: fixed;
        inset: 0;
        z-index: 9998;
        pointer-events: none;
        background: repeating-linear-gradient(
          to bottom,
          rgba(0, 255, 0, 0.018) 0px,
          rgba(0, 255, 0, 0.018) 1px,
          transparent 1px,
          transparent 3px
        );
        animation: boardFlicker 6s ease-in-out infinite;
      }
      @keyframes boardFlicker {
        0%, 96%, 100% { opacity: 1; }
        97% { opacity: 0.85; }
        98% { opacity: 1; }
        98.5% { opacity: 0.9; }
      }

      .flap-press:active {
        transform: translateY(1px) scaleY(0.93) !important;
        transition: transform 0.06s ease !important;
      }
    `}</style>
  );
}

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_-.[]{}*#@$";

const RESUME_DRIVE_URL = "https://drive.google.com/file/d/1Aoqh2NOuuVGJBky6L_klo7wSXrcyaYZW/view?usp=sharing";

// Drop a click.mp3 file into src/assets/ for the flap sound to play.
import clickSoundUrl from "./assets/click.mp3?url";

const FLAP_SOUND_POOL = Array.from({ length: 6 }, () => {
  const a = new Audio(clickSoundUrl);
  a.volume = 0.25;
  return a;
});
let flapSoundIdx = 0;

const playFlapSound = () => {
  const s = FLAP_SOUND_POOL[flapSoundIdx];
  s.currentTime = 0;
  s.play().catch(() => {});
  flapSoundIdx = (flapSoundIdx + 1) % FLAP_SOUND_POOL.length;
};

export function FlapSegment({ targetChar, speed = 10, sound = false }) {
  const [currentChar, setCurrentChar] = useState(" ");

  useEffect(() => {
    const targetIdx = FLAP_CHARS.indexOf(targetChar.toUpperCase());
    if (targetIdx === -1) {
      setCurrentChar(targetChar);
      return;
    }

    let currentIdx = 0;
    const interval = setInterval(() => {
      setCurrentChar(FLAP_CHARS[currentIdx]);

      if (sound) {
        playFlapSound();
      }

      if (currentIdx === targetIdx) {
        clearInterval(interval);
      } else {
        currentIdx = (currentIdx + 1) % FLAP_CHARS.length;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [targetChar, speed, sound]);

  return <span className="flap-cell">{currentChar}</span>;
}

export function FlapRow({ text, length = 22, speed = 50, sound = false }) {
  const paddedText = text.padEnd(length, " ").slice(0, length);
  return (
    <div style={{ display: "flex", gap: "2px", justifyContent: "center" }}>
      {paddedText.split("").map((char, i) => (
        <FlapSegment key={i} targetChar={char} speed={speed + i * 2} sound={sound} />
      ))}
    </div>
  );
}

export default function Home() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 17) return "Good afternoon!";
    return "Good evening!";
  };

  const [role, setRole] = useState("High School Junior");
  const [displayView, setDisplayView] = useState("home");
  const [transitioning, setTransitioning] = useState(false);
  const pendingView = useRef("home");
  const pendingProjectSlug = useRef(null);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(null);
  const [now, setNow] = useState(new Date());

  const navigate = (target, projectSlug = null) => {
    if (transitioning || (target === displayView && projectSlug === selectedProjectSlug)) return;

    if (target === "project" || (target === "projects" && displayView === "project")) {
      setDisplayView(target);
      setSelectedProjectSlug(projectSlug);
      return;
    }

    pendingView.current = target;
    pendingProjectSlug.current = projectSlug;
    setTransitioning(true);
  };

  useEffect(() => {
    if (!transitioning) return;
    const swapDelay = 500;
    const endDelay = 1000;
    const swap = setTimeout(() => {
      setDisplayView(pendingView.current);
      setSelectedProjectSlug(pendingProjectSlug.current);
    }, swapDelay);
    const end = setTimeout(() => setTransitioning(false), endDelay);
    return () => {
      clearTimeout(swap);
      clearTimeout(end);
    };
  }, [transitioning]);

  useEffect(() => {
    const roles = ["embedded systems", "software developer", "aircraft", "aspiring engineer"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % roles.length;
      setRole(roles[i]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  let pageBody;

  if (displayView === "projects") {
    pageBody = (
      <Projects
        onBack={() => navigate("home")}
        onOpenProject={(slug) => navigate("project", slug)}
      />
    );
  } else if (displayView === "project") {
    pageBody = <ProjectDetail slug={selectedProjectSlug} onBack={() => navigate("projects")} />;
  } else if (displayView === "about") {
    pageBody = <About onBack={() => navigate("home")} />;
  }

  const navBtnStyle = {
    fontFamily: "inherit",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "#a0a0aa",
    border: "2px solid #25252a",
    background: "#111115",
    fontWeight: "bold",
    fontSize: "0.85rem",
    letterSpacing: "2px",
    width: "140px",
    height: "44px",
    borderRadius: "6px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    cursor: "pointer",
    boxSizing: "border-box"
  };

  if (displayView === "home") {
    pageBody = (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: #0a0a0c;
          font-family: "Courier New", Courier, monospace;
          overflow-x: hidden;
        }

        .home-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 0%, rgba(0, 255, 0, 0.07), transparent 55%),
            radial-gradient(circle at 85% 90%, rgba(0, 255, 0, 0.05), transparent 45%);
        }

        .home-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .home-card:hover {
          border-color: #24242c;
          box-shadow: 0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(0, 255, 0, 0.06), inset 0 0 2px rgba(255,255,255,0.1);
        }

        .home-nav {
        }

        .home-status {
        }

        .home-social a {
        }
        .home-social a:hover {
          transform: translateY(-3px);
          transition: none !important;
        }
        .home-social a:hover svg {
          stroke: #00ff00;
          filter: drop-shadow(0 0 6px rgba(0, 255, 0, 0.4));
        }
        .home-social svg {
          transition: stroke 0.2s ease, filter 0.2s ease;
        }

        .flap-cell {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(16px, 4.3vw, 3.2rem);
          height: clamp(28px, 7vw, 3.5rem);
          background: linear-gradient(to bottom, #151518 49%, #000000 51%);
          color: #f0f0f0;
          font-size: clamp(0.9rem, 2.6vw, 1.8rem);
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

        .home-card {
          padding: 30px;
        }
        .home-social svg {
          width: 48px;
          height: 48px;
        }

        .home-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 40px 20px;
          box-sizing: border-box;
        }

        @media (max-width: 600px) {
          .home-wrapper {
            justify-content: space-evenly;
            min-height: 100svh;
            padding: 32px 20px;
          }
          .home-card {
            padding: 28px 18px !important;
          }
          .home-social {
            gap: 1.5rem !important;
          }
          .home-social svg {
            width: 42px;
            height: 42px;
          }
          .home-nav {
            margin-top: 0 !important;
            gap: 16px !important;
          }
          .home-nav .nav-flap {
            flex: 1 1 40%;
            min-width: 130px;
          }
          .home-status {
            margin-top: 0 !important;
          }
        }
      `}</style>

      <div className="home-bg" />

      <div className="home-wrapper">
        <div
          className="home-card"
          style={{
            background: "#111115",
            borderRadius: "12px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.7), inset 0 0 2px rgba(255,255,255,0.1)",
            border: "4px solid #1a1a22",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "100%",
            maxWidth: "750px"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FlapRow text={getGreeting()} length={18} speed={20} sound={true} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FlapRow text="Abhiram Vadali" length={18} sound={true} />
          </div>

          <div style={{ marginTop: "10px", borderTop: "1px dashed #22222a", paddingTop: "20px" }}>
            <FlapRow text={role} length={18} sound={true} />
          </div>

          <div className="home-social" style={{ display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "center", width: "100%", margin: "1rem 0" }}>
            <a href="https://github.com/AbhiramV010/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ display: "flex" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>

            <a href="https://www.linkedin.com/in/abhiramv010/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: "flex" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            <a href="https://devpost.com/AbhiramV010" target="_blank" rel="noopener noreferrer" aria-label="Devpost" style={{ display: "flex" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2h7.5L18 12l-4.5 10H6V2zm5 15h2l2.5-5L13 7h-2v10z"></path>
              </svg>
            </a>
          </div>
        </div>

        <nav
          className="home-nav"
          style={{
            marginTop: "60px",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            fontFamily: '"Courier New", Courier, monospace'
          }}
        >
          <button onClick={() => navigate("projects")} className="nav-flap flap-press" style={navBtnStyle}>
            PROJECTS
          </button>
          <button onClick={() => navigate("about")} className="nav-flap flap-press" style={navBtnStyle}>
            ABOUT ME
          </button>
          <a href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="nav-flap flap-press" style={navBtnStyle}>
            RESUME
          </a>
        </nav>

        <div
          className="home-status"
          style={{
            marginTop: "28px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#808088",
            fontSize: "0.75rem",
            letterSpacing: "1px",
            fontWeight: "bold"
          }}
        >
          <span>OPEN TO OPPORTUNITIES</span>
          <span style={{ color: "#404048" }}>|</span>
          <span>
            {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
          </span>
        </div>
      </div>
    </>
    );
  }

  return (
    <>
      {pageBody}
      <div className="board-ambient" aria-hidden="true" />
      <BoardShutter active={transitioning} />
      <ShutterStyles />
    </>
  );
}