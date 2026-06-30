import { useEffect, useState } from "react";
import Projects from "./pages/Projects";
import About from "./pages/About";

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_-.[]{}*#@$";

export function FlapSegment({ targetChar, speed = 10}) {
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
      
      if (currentIdx === targetIdx) {
        clearInterval(interval);
      } else {
        currentIdx = (currentIdx + 1) % FLAP_CHARS.length;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [targetChar, speed]);

  return (
    <span className="flap-cell">
      {currentChar}
    </span>
  );
}

export function FlapRow({text, length = 22, speed = 50}) {
  const paddedText = text.padEnd(length, " ").slice(0, length);
  return (
    <div style= {{ display: "flex", gap: "2px", justifyContent: "center"}}>
      {paddedText.split("").map((char, i) => (
        <FlapSegment key={i} targetChar={char} speed={speed + (i*2)} />
      ))}
    </div>
  )
}

export default function Home() {
  const [currentView, setCurrentView] = useState("home"); 

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 17) return "Good afternoon!";
    return "Good evening!";
  };

  // ROUTING HANDLERS
  if (currentView === "projects") {
    return <Projects onBack={() => setCurrentView("home")} />;
  }
  if (currentView === "about") {
    return <About onBack={() => setCurrentView("home")} />;
  }

  return (
    <>
      <style>{`
        html, body {
          margin: 1;
          padding: 0;
          background: #0a0a0c;
          font-family: "Courier New", Courier, monospace;
          overflow-x: hidden;
        }
        
        .flap-cell {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 8rem;
          height: 3.5rem;
          background: linear-gradient(to bottom, #151518 49%, #000000 51%);
          color: #f0f0f0;
          font-size: 1.8rem;
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
          border-color: #d19a66 !important;
          transform: translateY(-2px);
        }
      `}</style>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 20px",
        boxSizing: "border-box"
      }}>
        <div style={{
          background: "#111115",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.7), inset 0 0 2px rgba(255,255,255,0.1)",
          border: "4px solid #1a1a22",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
          maxWidth: "750px"
        }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FlapRow text={getGreeting()} length={18} speed={20} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FlapRow text="Abhiram Vadali" length={18} />
          </div>

          <div style={{marginTop: "10px", borderTop: "1px dashed #22222a", paddingTop: "20px"}}>
            {/* Kept role mapping intact, but extracted wrapper components can go here later */}
            <FlapRow text="software developer" length={18} /> 
          </div>
        </div>

        <nav style={{
          marginTop: "60px",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          fontFamily: '"Courier New", Courier, monospace'
        }}>
          {["PROJECTS","ABOUT ME" ,"CONTACT",].map((target) => (
            <button 
              key={target}
              onClick={() => {
                if (target === "PROJECTS") {
                  setCurrentView("projects");
                } else if (target === "ABOUT ME") {
                  setCurrentView("about"); // Fixed string value case mismatch here
                }
              }}
              className="nav-flap" 
              style={{
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
                cursor: "pointer"
              }}
            >
              {target}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}