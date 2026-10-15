import { useEffect, useState } from "react";
import LineMark from "./LineMark";
import Link from "./Link";
import { ROUTE } from "../lines";
import { pathFor } from "../routes";

const FLASH_MS = 1500;
const SKIP_MS = 350;
const HOLD_MS = 3200;

// Flashes each stop in turn and leaves it lit; holds after the last, then restarts.
function useRouteSequence(current) {
  const [phase, setPhase] = useState(0);
  const count = ROUTE.length;

  useEffect(() => {
    let wait = HOLD_MS;
    if (phase < count) wait = ROUTE[phase].key === current ? SKIP_MS : FLASH_MS;
    const t = setTimeout(() => setPhase((p) => (p >= count ? 0 : p + 1)), wait);
    return () => clearTimeout(t);
  }, [phase, count, current]);

  return phase;
}

export default function RouteBar({ current, line, onNavigate, onResume }) {
  const phase = useRouteSequence(current);
  const last = ROUTE.length - 1;
  const progress = Math.min(phase, last) / last;

  return (
    <header className="routebar">
      <div className="routebar-inner">
        <Link href="/" className="brand" onNavigate={() => onNavigate("home")} aria-label="Abhiram Vadali, home">
          <LineMark line={line} />
          <span className="brand-name">Abhiram Vadali</span>
        </Link>

        <nav aria-label="Site map">
          <ol className="routemap" style={{ "--progress": progress }}>
            {ROUTE.map((stop, i) => {
              const isCurrent = stop.key === current;
              let seq = "";
              if (!isCurrent) seq = i < phase ? " rm-lit" : i === phase ? " rm-flash" : "";

              const inner = (
                <>
                  <span className="rm-dot" aria-hidden="true" />
                  <span className="rm-label">{stop.label}</span>
                </>
              );

              return (
                <li key={stop.key} className={`${isCurrent ? "is-current" : ""}${seq}`.trim() || undefined}>
                  {stop.modal ? (
                    <button type="button" className="rm-stop" onClick={onResume}>
                      {inner}
                    </button>
                  ) : (
                    <Link
                      href={pathFor(stop.key)}
                      className="rm-stop"
                      onNavigate={() => onNavigate(stop.key)}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
}
