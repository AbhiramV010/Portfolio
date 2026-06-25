import { useState, useEffect } from 'react';

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_-.[]{}*#@$";

function FlapSegment({ targetChar, speed = 10}) {
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

function FlapRow({text, length = 22, speed = 50}) {
  const paddedText = text.padEnd(length, " ").slice(0, length);
  return (
    <div style= {{ display: "flex", gap: "2px", justifyContent: "center"}}>
      {paddedText.split("").map((char, i) => (
        <FlapSegment key={i} targetChar={char} speed={speed + (i*2)} />
      ))}
    </div>
  )
}

export default function Projects({ onBack }) {
  return (
    <>
      <style>{`
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
          font-family: "Courier New", Courier, monospace;
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
      `}</style>

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
        maxWidth: "550px"
      }}>
        
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          color: "#55555c", 
          fontSize: "0.75rem", 
          fontWeight: "bold",
          letterSpacing: "4px",
          padding: "0 10px"
        }}>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px"}}>
          <FlapRow text="  Projects  " length={12} />
        </div>

      </div>
    </>
  );
}