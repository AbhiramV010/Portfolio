// Base shape points right; `dir` rotates it.
const ROTATE = { right: 0, left: 180, up: -90, external: -45 };

export function Arrow({ dir = "right", className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ transform: `rotate(${ROTATE[dir]}deg)` }}
    >
      <path d="M2 9.5h11V4l9 8-9 8v-5.5H2z" />
    </svg>
  );
}
