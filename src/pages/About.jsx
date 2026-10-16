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
    honor: "Grade 9 Honour Roll · ICT SHSM",
  },
  {
    school: "Williams Parkway Sr. PS",
    degree: "Middle School Diploma",
    date: "Sep 2021 - Jun 2024",
    location: "Brampton, ON",
    honor: "Grade 8 IBT Business · Grade 7 & 8 Band",
  },
];

const skillGroups = [
  { category: "Languages", items: ["Python 3", "C/C++", "Java", "HTML/CSS", "SQL", "Node.js"] },
  { category: "Frameworks & ML", items: ["React", "Next.js", "Tailwind CSS", "PostgreSQL", "TensorFlow", "Computer Vision"] },
  { category: "Hardware & Design", items: ["Arduino", "ESP32", "Raspberry Pi Pico", "KiCad 10.0"] },
];

const timeline = [
  { date: "Jul 2026 - Sep 2026", event: "Railway Academy — Summer Engineering Intern", subtitle: "Built railway asset classification for edge deployment, testing six computer vision architectures on resource-constrained hardware.", detail: "Weighed accuracy, speed and model size so the model could run offline in the field, detecting trains, track, signals, platforms, overhead wire and crossing gates.", highlight: false },
  { date: "Jan 2026 - Sep 2026", event: "Toastmasters International — General Member", subtitle: "Took part in weekly speaking activities at the Brampton Gavel Club, from prepared speeches to impromptu \"Table Topics\".", detail: null, highlight: false },
  { date: "Sep 2025 - Jun 2026", event: "STEAM IC — Chapter Executive", subtitle: "Taught and oversaw students competing in the Computer Science event at STEAM ICAC.", detail: "Competed at STEAM ICAC 2026 with Iris-Lite, my team's solution to the storage and power consumption of security cameras.", highlight: false },
  { date: "Jul 2025 - Jan 2026", event: "Brampton FBLC, JEC & TA — Director of Systems", subtitle: "Developed the organization's landing page and member portal using React and PostgreSQL.", detail: "Started as Systems Executive and became Director of Systems in Sep 2025. Worked with the team on architecture, data models, requirements and the project's work breakdown structure.", highlight: false },
  { date: "Jul 2025 - Aug 2025", event: "Brampton FBLC — Junior Executive", subtitle: "Created recap videos and Instagram posts for the Founder's Feed news series.", detail: null, highlight: false },
  { date: "Jun 2024 - Apr 2025", event: "Guruvayurappan Temple of Brampton — Temple Volunteer", subtitle: "Developed a volunteer-management app to track volunteer commitments.", detail: "Also helped with a variety of tasks at the temple, including cleaning utensils and packing food.", highlight: false },
  { date: "Jan 2024 - Jul 2025", event: "Brampton Library — Student Volunteer", subtitle: "Aided with the coordination, setup, and take-down of library programs.", detail: null, highlight: false },
];

const certifications = [
  { name: "Claude Academy: Claude Code 101", issuer: "Anthropic", date: "October 2026", credentialId: "c14b65230bd4c61505d9ebc6688f8e76" },
  { name: "Bronze Star", issuer: "Lifesaving Society Ontario", date: "July 2025" },
  { name: "Certified Entry Level Python Programmer – PCEP-30-02", issuer: "Python Institute", date: "October 2024", credentialId: "71uV.9zuA.WXnV" },
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
      <Fascia line={5} title="About Me" />

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
