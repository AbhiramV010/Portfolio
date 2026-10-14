import { Arrow } from "./icons";

export default function BackButton({ onBack }) {
  return (
    <button type="button" className="back-btn" onClick={onBack}>
      <Arrow dir="left" />
      BACK
    </button>
  );
}
