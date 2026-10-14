const CARS = 5;
const CAR_W = 190;
const GAP = 3;
const HEIGHT = 56;
const WIDTH = CARS * CAR_W + (CARS - 1) * GAP;

function Car({ x, head }) {
  const doors = head ? [14, 84] : [14, 84, 154];
  const windows = [40, 62, 110, 132];

  return (
    <g transform={`translate(${x} 0)`}>
      {head ? (
        <path className="train-body" d="M9 4H158C175 4 186 14 190 30V44H9Q0 44 0 35V13Q0 4 9 4Z" />
      ) : (
        <rect className="train-body" x="0" y="4" width={CAR_W} height="40" rx="9" />
      )}
      <rect className="train-stripe" x="4" y="31" width={head ? 176 : CAR_W - 8} height="3" />
      {windows.map((wx) => (
        <rect key={wx} className="train-glass" x={wx} y="12" width="18" height="12" rx="2" />
      ))}
      {doors.map((dx) => (
        <g key={dx}>
          <rect className="train-door" x={dx} y="9" width="22" height="32" rx="2" />
          <rect className="train-glass" x={dx + 4} y="12" width="14" height="14" rx="1.5" />
        </g>
      ))}
      {head && <path className="train-glass" d="M162 11H167C176 11 182 17 185 27H162Z" />}
      {head && <circle className="train-light" cx="187" cy="35" r="2" />}
      <circle className="train-wheel" cx="28" cy="49" r="4" />
      <circle className="train-wheel" cx="162" cy="49" r="4" />
    </g>
  );
}

export default function Train() {
  return (
    <div className="track" aria-hidden="true">
      <div className="train">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width={WIDTH} height={HEIGHT}>
          {Array.from({ length: CARS }, (_, i) => (
            <Car key={i} x={i * (CAR_W + GAP)} head={i === CARS - 1} />
          ))}
        </svg>
      </div>
    </div>
  );
}
