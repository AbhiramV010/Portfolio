import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_-.[]{}*#@$";

function ScrambleText({ text, speed = 45 }) {
  const [displayText, setDisplayText] = useState(text);
  const iterations = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    iterations.current = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations.current) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterations.current >= text.length) {
        clearInterval(intervalRef.current);
      }

      iterations.current += 1 / 3;
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [text, speed]);

  return <span>{displayText}</span>;
}

export default function Home() {
  const [role, setRole] = useState("EMBEDDED ENGINEER");

  useEffect(() => {
    const roles = ["EMBEDDED ENGINEER", "HARDWARE DESIGNER", "SOFTWARE DEVELOPER"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % roles.length;
      setRole(roles[i]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: #0a0a0a;
        }
        .hover-target {
          transition: all 0.2s ease !important;
        }
        .hover-target:hover {
          background: rgba(0, 255, 102, 0.1) !important;
          box-shadow: 0 0 10px rgba(0, 255, 102, 0.3) !important;
        }
      `}</style>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        fontFamily: "Courier New, monospace",
        padding: "20px",
        boxSizing: "border-box"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          textAlign: "center",
          maxWidth: "800px"
        }}>
          <h1 style={{ fontSize: "2.5rem", margin: 0, fontWeight: "bold", letterSpacing: "2px" }}>
            <ScrambleText text="HELLO I AM ABHIRAM" />
          </h1>

          <h2 style={{ fontSize: "1.8rem", margin: 0, color: "#00ff66", letterSpacing: "1px" }}>
            <ScrambleText text={role} />
          </h2>

          <p style={{ fontSize: "1.1rem", margin: 0, color: "#888" }}>
            <ScrambleText text="VIEW MY WORK BELOW" speed={20} />
          </p>
        </div>

        <nav style={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: "24px",
          justifyContent: "center"
        }}>
          <a href="#projects" className="hover-target" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none", color: "#00ff66", border: "1px solid #00ff66",
            fontWeight: "bold", fontSize: "0.9rem", background: "transparent",
            whiteSpace: "nowrap", boxSizing: "border-box", width: "130px",
            height: "36px", lineHeight: "1", padding: "0"
          }}>PROJECTS</a>

          <a href="#about" className="hover-target" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none", color: "#00ff66", border: "1px solid #00ff66",
            fontWeight: "bold", fontSize: "0.9rem", background: "transparent",
            whiteSpace: "nowrap", boxSizing: "border-box", width: "130px",
            height: "36px", lineHeight: "1", padding: "0"
          }}>ABOUT</a>

          <a href="#contact" className="hover-target" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none", color: "#00ff66", border: "1px solid #00ff66",
            fontWeight: "bold", fontSize: "0.9rem", background: "transparent",
            whiteSpace: "nowrap", boxSizing: "border-box", width: "130px",
            height: "36px", lineHeight: "1", padding: "0"
          }}>CONTACT</a>
        </nav>
      </div>
    </>
  );
}