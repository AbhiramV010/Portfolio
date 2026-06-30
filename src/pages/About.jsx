export default function About({ onBack }) {
  return (
    <div style={{ background: "#0a0a0c", minHeight: "100vh", padding: "24px" }}>
      <button 
        onClick={onBack}
        style={{
          background: "#25252a",
          color: "#a0a0aa",
          border: "2px solid #35353a",
          padding: "6px 16px",
          cursor: "pointer",
          borderRadius: "8px"
        }}
      >
        BACK
      </button>
        
    </div>
  );
}