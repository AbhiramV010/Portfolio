import { useState, useEffect } from 'react';
import { FlapRow } from '../App';

function InfoCard({ title, children }) {
  return (
    <div style={{
      background: "#16161c",
      border: "2px solid #25252a",
      borderRadius: "8px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset 0 0 1px rgba(255,255,255,0.05)"
    }}>
      <h3 style={{ 
        color: "#f0f0f0", 
        margin: 0, 
        fontSize: "1.75rem", 
        fontWeight: "bold",
        letterSpacing: "1px",
        borderBottom: "1px dashed #25252a",
        paddingBottom: "12px"
      }}>
        {title}
      </h3>
      <div style={{ color: "#a0a0aa", fontSize: "1.0rem", lineHeight: "1.6" }}>
        {children}
      </div>
    </div>
  );
}

export default function About({ onBack }) {
  const [tick, setTick] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 7500);
    return () => clearInterval(interval);
  }, []);

  const skillGroups = [
    { category: "Languages", items: ["Java", "Python", "C", "C++", "JavaScript", "SQL"] },
    { category: "Frontend", items: ["React.js", "Vite", "Tailwind CSS", "HTML5", "CSS3", "Swing GUI"] },
    { category: "Backend/DB", items: ["Node.js", "FastAPI", "PostgreSQL", "REST APIs", "Linux Shell", "Git"] },
    { category: "Hardware/Embedded", items: ["KiCad", "PCB Design", "ESP32-C3", "ATmega328P", "Raspberry Pi", "Firmware"] }
  ];

  const timeline = [
    { date: "PAST", event: "Brampton FBLC, JEC & TA", subtitle: "Systems Executive", detail: "Worked with a team of programmers to design the organization's landing page site", highlight: false },
    { date: "PAST", event: "Iris-Lite Development", subtitle: "Lead Programmer", detail: "A timeline for my work/project history", highlight: false },
    { date: "PAST", event: "EZ-VolunteerSys", subtitle: "Developer", detail: "A timeline for my work/project history", highlight: false }
  ];

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

        .timeline-wrapper {
          display: flex;
          position: relative;
          padding-left: 32px;
          flex-direction: column;
          gap: 16px;
        }

        .timeline-axis {
          position: absolute;
          left: 10px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #1e1e24;
        }

        .timeline-row {
          display: flex;
          position: relative;
          align-items: center;
          width: 100%;
        }

        .timeline-indicator {
          position: absolute;
          left: -32px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #111115;
          border: 2px solid #25252a;
          box-sizing: border-box;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timeline-row.active .timeline-indicator {
          border-color: #00ff00;
          background: #00ff00;
          box-shadow: 0 0 12px rgba(209, 154, 102, 0.4);
        }

        .timeline-card {
          width: 100%;
          background: #131318;
          border: 1px solid #202026;
          border-radius: 6px;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          box-sizing: border-box;
        }

        .read-more-btn {
          background: transparent;
          border: none;
          color: #a0a0aa;
          font-family: "Courier New", Courier, monospace;
          font-size: 0.75rem;
          font-weight: bold;
          letter-spacing: 1px;
          cursor: pointer;
          padding: 0;
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          transition: color 0.15s ease;
        }

        .read-more-btn:hover {
          color: #00ff00;
        }
      `}</style>      

      <div style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: "24px" }}>
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
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FlapRow key={tick} text="About Me" length={8} />
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            <InfoCard title="Overview">
              A box saying who I am
            </InfoCard>

            <InfoCard title="Technical Frameworks & Skills">
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
                gap: "16px" 
              }}>
                {skillGroups.map((group, index) => (
                  <div key={index} style={{
                    background: "#1a1a22",
                    border: "1px solid #25252a",
                    borderRadius: "6px",
                    padding: "16px"
                  }}>
                    <div style={{ color: "#00ff00", fontWeight: "bold", fontSize: "0.9rem", marginBottom: "10px" }}>
                      [{group.category}]
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {group.items.map((tech, i) => (
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
                ))}
              </div>
            </InfoCard>

            <InfoCard title="History & Milestones">
              <div className="timeline-wrapper">
                <div className="timeline-axis" />
                {timeline.map((item, index) => (
                  <div key={index} className={`timeline-row ${item.highlight ? 'active' : ''}`}>
                    <div className="timeline-indicator" />
                    
                    <div className="timeline-card">
                      <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                          <span style={{ color: "#f0f0f0", fontWeight: "bold", fontSize: "1.2rem" }}>
                            {item.event}
                          </span>
                        </div>
                        
                        <span style={{ color: "#00ff00", fontSize: "0.85rem", marginTop: "4px", fontWeight: "500" }}>
                          {item.subtitle}
                        </span>

                        <button 
                          type="button" 
                          className="read-more-btn"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          {hoveredIndex === index ? "READ LESS -" : "READ MORE +"}
                        </button>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", maxWidth: "50%" }}>
                        <span style={{ 
                          border: `1px solid ${item.highlight ? '#00ff00' : '#25252a'}`,
                          color: item.highlight ? '#00ff00' : '#a0a0aa',
                          fontSize: "0.65rem",
                          fontWeight: "bold",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          letterSpacing: "1px"
                        }}>
                          {item.date}
                        </span>
                        
                        {hoveredIndex === index && (
                          <span style={{ 
                            color: "#b0b0b8", 
                            fontSize: "0.85rem", 
                            fontFamily: '"Courier New", Courier, monospace',
                            marginTop: "6px",
                            textAlign: "right",
                            background: "#1c1c24",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            border: "1px solid #282830",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                          }}>
                            {item.detail}
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </InfoCard>

          </div>
        </div>
      </div>
    </>
  );
}