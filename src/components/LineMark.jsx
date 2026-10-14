// Plain colour marker for a line: a dot by default, a bar inside page titles.
export default function LineMark({ line }) {
  return <span className={`line-mark line-${line}`} aria-hidden="true" />;
}
