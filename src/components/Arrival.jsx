export default function Arrival({ label }) {
  return (
    <div className="arrival" aria-hidden="true">
      <span className="arrival-label">Now arriving</span>
      <span className="arrival-dest">{label}</span>
    </div>
  );
}
