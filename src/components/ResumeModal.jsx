import { useEffect, useRef } from "react";
import { Arrow } from "./icons";
import { RESUME_DRIVE_URL, RESUME_PREVIEW_URL } from "../lines";

export default function ResumeModal({ onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label="Resume"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <span>Resume</span>
          <div className="modal-tools">
            <a className="action" href={RESUME_DRIVE_URL} target="_blank" rel="noopener noreferrer">
              Open in Drive
              <Arrow dir="external" />
            </a>
            <button type="button" className="back-btn" ref={closeRef} onClick={onClose}>
              CLOSE
            </button>
          </div>
        </div>
        <iframe className="modal-frame" src={RESUME_PREVIEW_URL} title="Resume preview" />
      </div>
    </div>
  );
}
