import { PROJECTS } from '../data/projects';

export default function ProjectDetail({ slug, onBack }) {
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="projects-shell" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: "24px", fontFamily: '"Courier New", Courier, monospace' }}>
        <button onClick={onBack} className="back-btn flap-press">BACK</button>
      </div>
    );
  }

  const { name, accolade, year, stack = [], desc, actions, mediaSrc } = project;

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

        .detail-yearevent {
          color: #00ff00;
          font-size: 0.75rem;
          font-weight: bold;
          letter-spacing: 1.5px;
        }
        .detail-title {
          color: #f0f0f0;
          font-size: 1.8rem;
          font-weight: bold;
          letter-spacing: 0.5px;
          margin: 0;
        }
        .detail-desc {
          color: #a0a0aa;
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0;
        }
        .detail-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .detail-link {
          background: transparent;
          color: #a0a0aa;
          border: 2px solid #35353a;
          padding: 8px 16px;
          font-family: inherit;
          font-weight: bold;
          font-size: 0.85rem;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .detail-link:hover {
          color: #00ff00;
          border-color: #00ff00;
          transform: translateY(-2px);
        }
        .detail-media {
          width: 100%;
          max-width: 640px;
          aspect-ratio: 16/9;
          overflow: hidden;
          border-radius: 4px;
          border: 1px solid #25252a;
          background: #0d0d11;
        }
        .detail-media iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .detail-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .tech-tag {
          background: transparent;
          color: #b0b0b8;
          font-size: 0.75rem;
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid #303036;
          transition: transform 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .tech-tag:hover {
          transform: translateY(-2px);
          border-color: #00ff00;
          color: #00ff00;
        }

        @media (max-width: 640px) {
          .detail-shell {
            padding: 12px !important;
          }
          .detail-card {
            padding: 20px 14px !important;
          }
          .detail-title {
            font-size: 1.4rem !important;
          }
        }
      `}</style>

      <div className="detail-shell" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: "24px" }}>
        <div className="detail-card" style={{
          background: "#111115",
          padding: "30px",
          borderRadius: "12px",
          boxSizing: "border-box",
          boxShadow: "0 20px 50px rgba(0,0,0,0.7), inset 0 0 2px rgba(255,255,255,0.1)",
          border: "4px solid #1a1a22",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          maxWidth: "760px",
          margin: "0 auto",
        }}>
          <button onClick={onBack} className="back-btn flap-press">
            BACK
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span className="detail-yearevent">{year}{accolade ? ` · ${accolade}` : ""}</span>
            <h1 className="detail-title">{name}</h1>
          </div>

          <p className="detail-desc">{desc}</p>

          {actions?.length > 0 && (
            <div className="detail-actions">
              {actions.map((act) => (
                <a
                  key={act.href}
                  href={act.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-link"
                >
                  {act.label}
                </a>
              ))}
            </div>
          )}

          {mediaSrc && (
            <div className="detail-media">
              <iframe
                src={mediaSrc}
                title={`${name} demo`}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="detail-tags">
            {stack.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
