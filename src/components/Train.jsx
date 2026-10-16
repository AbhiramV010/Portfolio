const CARS = 5;
const CAR_W = 190;
const GAP = 3;
const HEIGHT = 56;
const WIDTH = CARS * CAR_W + (CARS - 1) * GAP;

const doorXs = (head) => (head ? [14, 84] : [14, 84, 154]);
const DOOR_W = 22;

function Door({ x }) {
  return (
    <g>
      <rect className="train-doorway" x={x + 1} y="10" width={DOOR_W - 2} height="30" rx="1.5" />
      <g className="train-leaf train-leaf-l">
        <rect className="train-door" x={x} y="9" width={DOOR_W / 2} height="32" />
        <rect className="train-glass" x={x + 2} y="12" width="7" height="14" rx="1" />
      </g>
      <g className="train-leaf train-leaf-r">
        <rect className="train-door" x={x + DOOR_W / 2} y="9" width={DOOR_W / 2} height="32" />
        <rect className="train-glass" x={x + DOOR_W / 2 + 2} y="12" width="7" height="14" rx="1" />
      </g>
    </g>
  );
}

function Car({ x, head }) {
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
      {doorXs(head).map((dx) => (
        <Door key={dx} x={dx} />
      ))}
      {head && <path className="train-glass" d="M162 11H167C176 11 182 17 185 27H162Z" />}
      {head && <circle className="train-light" cx="187" cy="35" r="2" />}
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
