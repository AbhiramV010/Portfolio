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

export function Trophy({ className, title }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" role="img" aria-label={title}>
      {title && <title>{title}</title>}
      <path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.35A5 5 0 0 1 13 14.9V17h3v2H8v-2h3v-2.1A5 5 0 0 1 8.35 12H8a4 4 0 0 1-4-4V5h3V3zm0 4H6v1a2 2 0 0 0 1 1.73V7zm10 0v2.73A2 2 0 0 0 18 8V7h-1zM7 20h10v1H7z" />
    </svg>
  );
}
