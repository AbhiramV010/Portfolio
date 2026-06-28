import { useState, useEffect } from 'react';
import { FlapSegment, FlapRow } from '../App';

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_-.[]{}*#@$";

// function to return a card with the project, helps me add more later
// takes name, description, event, and dev-stack 

function ProjectCard({ name, desc, event, stack, isOnline }) {
  return (
    <div style={{
      background: "#16161c",
      border: "2px solid #25252a",
      borderRadius: "8px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: "16px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset 0 0 1px rgba(255,255,255,0.05)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h3 style={{ 
          color: "#f0f0f0", 
          margin: 0, 
          fontSize: "2.50rem", 
          fontWeight: "bold",
          letterSpacing: "1px"
        }}>
          {name}
        </h3>
        <span style={{ 
          color: "#d19a66", 
          fontSize: "0.9rem", 
          fontWeight: "bold" 
        }}>
          [{event}]
        </span>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1px 1fr", 
        gap: "24px", 
        alignItems: "start", 
        flexGrow: 1 
      }}>
        <p style={{ 
          color: "#a0a0aa", 
          margin: 0, 
          fontSize: "1.4rem", 
          lineHeight: "1.6"
        }}>
          {desc}
        </p>

        

        <div style={{ borderLeft: "1px dashed #25252a", height: "100%" }} />
          
        <div style={{ width: "100%", aspectRatio: "16/9" }}>
          <iframe
            style={{ width: "100%", height: "100%", borderRadius: "4px", border: "1px solid #25252a" }}
            src="https://www.youtube.com/embed/2Gg6Seob5Mg?si=_j7NInFeVUWIhP3j"
            title={name}
            allowFullScreen
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
            <span key={i} style={{
              background: "#202026",
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

export default function Projects({ onBack }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 7500);
    return () => clearInterval(interval);
  }, []);

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
        width: "100vw",
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "24px"
      }}>
        
        <div style={{
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
          minHeight: "calc(100vh - 48px)", 
        }}>
          <button 
            onClick={onBack}
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
          > BACK
          </button>
          
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
          
          {/*projects go here*/} 
          <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
            <FlapRow key={tick} text="My Projects" length={11} />
          </div>
          
          <div style={{display: "flex", flexDirection: "column", gap: "32px", justifyContent: "flex-start"}}> 
            <ProjectCard 
              name="Iris-Lite" 
              desc={
                <>
                  <br />A lightweight surveillance prototype built on the Raspberry Pi 4B.<br /><br /> It uses a set of Python scripts for event detection, and an intelligent compression software (PELICAN) to compress video. <br /><br /> It features 3 main edge-algorithms: a sound monitor, zone monitor, and detector pipeline. <br /><br /> To lower the environmental footprint, I designed a carbon-aware circuit, which charges an onboard circuit only when power is renewable.
                  <br /><br />
                  <button 
                    type="button" 
                    onClick={() => window.location.href='https://github.com/AbhiramV010/Iris-Lite'}
                    style={{
                      background: "#25252a",
                      color: "#a0a0aa",
                      border: "2px solid #35353a",
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontFamily: '"Courier New", Courier, monospace',
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      borderRadius: "6px",
                      width: "fit-content",
                    }}
                  >
                    GitHub Repository
                  </button>
                </>
              } 
              event={"STEAM IC 2026 - Computer Science"} 
              stack={["Python 3.12.7", "Linux", "Raspberry Pi", "C++"]} 
            />
          </div>
        </div>
      </div>
    </>
  );
}