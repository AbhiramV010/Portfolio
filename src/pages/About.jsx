import { useState } from "react";
import Fascia from "../components/Fascia";
import BackButton from "../components/BackButton";
import { useReveal } from "../hooks/useReveal";
import "./About.css";

const education = [
  {
    school: "St. Edmund Campion CSS",
    degree: "High School Diploma",
    date: "Sep 2024 - Jun 2028",
    location: "Brampton, ON",
    honor: "9th Grade Honors",
  },
];

const skillGroups = [
  { category: "Languages", items: ["Python 3", "Java", "HTML/CSS", "SQL", "Node.js"] },
  { category: "Hardware & Design", items: ["Arduino", "KiCad 10.0"] },
];

const timeline = [
  { date: "Jul 2026 - Present", event: "ZRA Labs — Summer Engineering Intern", subtitle: "Aided in the development of ZRA's image recognition project.", detail: null, highlight: true },
  { date: "Sep 2025 - Jun 2026", event: "Campion STEAM IC — Chapter Executive & ICAC Participant", subtitle: "Created the Iris-Lite project (posted on GitHub) for this competition.", detail: "Guided other Computer Science participants to understand the fundamentals of programming, such as UML to help students visualize ideas.", highlight: false },
  { date: "Jan 2024 - Aug 2025", event: "Brampton Library — Student Volunteer", subtitle: "Aided in the set-up, take down, and smooth operation of library programs.", detail: null, highlight: false },
];

const certifications = [
  { name: "PCEP-30-02 – Certified Entry-Level Programme", issuer: "Python Institute", date: "October 2024", credentialId: "71uV.9zuA.WXnV" },
  { name: "IBM Python for Data Science 101", issuer: "IBM", date: "January 2022", credentialId: "01a86e73e11042a88346082fd3b48ee9" },
  { name: "PCB Design with KiCad 9.0", issuer: "Dr. Peter Dalmaris", date: "In Progress" },
];

function Section({ title, className = "", children }) {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className={`panel reveal${visible ? " is-visible" : ""} ${className}`}>
      <h2 className="panel-head">{title}</h2>
      <div className="panel-body">{children}</div>
    </section>
  );
}

function Education({ item }) {
  return (
    <div className="edu">
      <div className="edu-row">
        <span className="edu-school">{item.school}</span>
        <span className="edu-small">{item.date}</span>
      </div>
      <div className="edu-row">
        <span className="tag tag--live">{item.degree}</span>
        <span className="edu-small">{item.location}</span>
      </div>
      {item.honor && <p className="edu-honor">» {item.honor}</p>}
    </div>
  );
}

function Skills({ category, items }) {
  return (
    <div className="skill">
      <h3 className="skill-label">{category}</h3>
      <div className="tags">
        {items.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ item, id, open, onToggle }) {
  const [org, role] = item.event.split(" — ");
  return (
    <li className={`tl-row${item.highlight ? " is-live" : ""}`}>
      <span className="tl-marker" aria-hidden="true" />
      <div className="tl-body">
        <div className="tl-head">
          <h3 className="tl-event">
            <span className="tl-org">{org}</span>
            {role && <span className="tl-role">{role}</span>}
          </h3>
          <span className={`tag${item.highlight ? " tag--live" : ""}`}>{item.date}</span>
        </div>

        <p className="tl-sub">{item.subtitle}</p>

        {item.detail && (
          <>
            <button
              type="button"
              className="more-btn"
              aria-expanded={open}
              aria-controls={id}
              onClick={onToggle}
            >
              {open ? "READ LESS -" : "READ MORE +"}
            </button>
            <div id={id} className={`tl-detail${open ? " is-open" : ""}`}>
              <p>{item.detail}</p>
            </div>
          </>
        )}
      </div>
    </li>
  );
}

function Certification({ cert }) {
  const inProgress = cert.date === "In Progress";
  return (
    <li className="cert">
      <div className="cert-row">
        <span className="cert-name">{cert.name}</span>
        <span className={`tag${inProgress ? " tag--live" : ""}`}>{cert.date}</span>
      </div>
      <span className="cert-issuer">{cert.issuer}</span>
      {cert.credentialId && <span className="cert-id">ID: {cert.credentialId}</span>}
    </li>
  );
}

export default function About({ onBack }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <Fascia line={3} title="About Me" />

      <div className="page">
        <BackButton onBack={onBack} />

        <section className="panel about-intro">
          <p>
            I am a high school student at St. Edmund Campion CSS and an aspiring
            electrical engineer. I build custom circuit boards, write low-level
            code, and design software solutions to solve real-world problems.
          </p>
        </section>

        <div className="about-duo">
          <Section title="Education">
            <div className="stack-list">
              {education.map((item) => (
                <Education key={item.school} item={item} />
              ))}
            </div>
          </Section>

          <Section title="Technical Skills">
            <div className="stack-list">
              {skillGroups.map((group) => (
                <Skills key={group.category} category={group.category} items={group.items} />
              ))}
            </div>
          </Section>
        </div>

        <Section title="Experience">
          <ol className="tl">
            {timeline.map((item, index) => (
              <TimelineRow
                key={item.event}
                item={item}
                id={`tl-detail-${index}`}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </ol>
        </Section>

        <Section title="Certifications">
          <ul className="certs">
            {certifications.map((cert) => (
              <Certification key={cert.name} cert={cert} />
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}
