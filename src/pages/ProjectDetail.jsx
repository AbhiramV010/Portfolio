import Fascia from "../components/Fascia";
import BackButton from "../components/BackButton";
import { Arrow } from "../components/icons";
import { PROJECTS } from "../data/projects";
import "./ProjectDetail.css";

export default function ProjectDetail({ slug, onBack }) {
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="page">
        <BackButton onBack={onBack} />
      </div>
    );
  }

  const { name, accolade, year, stack = [], desc, actions, mediaSrc } = project;

  return (
    <>
      <Fascia line={2} title={name} sub={`${year}${accolade ? ` · ${accolade}` : ""}`} />

      <div className="page">
        <BackButton onBack={onBack} />

        <div className={`detail${mediaSrc ? " detail--media" : ""}`}>
          <div className="detail-copy">
            <p className="detail-desc">{desc}</p>

            {actions?.length > 0 && (
              <div className="detail-actions">
                {actions.map((act) => (
                  <a
                    key={act.href}
                    className="action"
                    href={act.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {act.label}
                    <Arrow dir="external" />
                  </a>
                ))}
              </div>
            )}

            <div className="tags">
              {stack.map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </div>

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
        </div>
      </div>
    </>
  );
}
