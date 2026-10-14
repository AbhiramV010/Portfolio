const CARS = 5;
const CAR_W = 190;
const GAP = 3;
const HEIGHT = 56;
const WIDTH = CARS * CAR_W + (CARS - 1) * GAP;

const doorXs = (head) => (head ? [14, 84] : [14, 84, 154]);
const DOOR_W = 22;

// `t` is seconds into the train's cycle; the doors open around 5s and close around 14s.
const PASSENGERS = [
  { car: 1, door: 0, kind: "off", dx: -46, t: 5.4 },
  { car: 1, door: 0, kind: "off", dx: 40, t: 6.1 },
  { car: 2, door: 1, kind: "off", dx: 52, t: 5.8 },
  { car: 3, door: 2, kind: "off", dx: -38, t: 6.5 },
  { car: 0, door: 2, kind: "off", dx: 44, t: 7.0 },
  { car: 1, door: 1, kind: "on", dx: -60, t: 7.6 },
  { car: 2, door: 0, kind: "on", dx: 55, t: 8.5 },
  { car: 3, door: 1, kind: "on", dx: -50, t: 9.3 },
  { car: 2, door: 2, kind: "on", dx: 62, t: 10.2 },
  { car: 0, door: 1, kind: "on", dx: -48, t: 11.0 },
];

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
      <circle className="train-wheel" cx="28" cy="49" r="4" />
      <circle className="train-wheel" cx="162" cy="49" r="4" />
    </g>
  );
}

function Passenger({ car, door, kind, dx, t }) {
  const x = car * (CAR_W + GAP) + doorXs(car === CARS - 1)[door] + DOOR_W / 2;
  return (
    <g transform={`translate(${x} ${HEIGHT})`}>
      <g className={`pax pax-${kind}`} style={{ "--dx": `${dx}px`, "--t": `${t}s` }}>
        <g className="pax-body">
          <circle cx="0" cy="-15.2" r="2.3" />
          <rect x="-2.7" y="-12.4" width="5.4" height="7.4" rx="2.4" />
          <rect x="-2.2" y="-5.4" width="1.9" height="5.4" rx="0.6" />
          <rect x="0.3" y="-5.4" width="1.9" height="5.4" rx="0.6" />
        </g>
      </g>
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
          {PASSENGERS.map((p, i) => (
            <Passenger key={i} {...p} />
          ))}
        </svg>
      </div>
    </div>
  );
}
