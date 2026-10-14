const LINES = [
  {
    line: 1,
    d: "M1210 130H1000L890 240V430L790 530H620",
    stations: [[890, 300], [890, 430], [620, 530]],
  },
  {
    line: 2,
    d: "M1210 360H1110L1040 430V560L960 640H700L640 700H300",
    stations: [[1110, 360], [1040, 500], [700, 640], [300, 700]],
  },
  {
    line: 3,
    d: "M820 -10V90L900 170H1210",
    stations: [[820, 60], [1000, 170]],
  },
  {
    line: 4,
    d: "M1210 660H1100L1030 730H860",
    stations: [[1100, 660], [860, 730]],
  },
];

// Faint static transit-map backdrop.
export default function SystemMap() {
  return (
    <svg
      className="sysmap"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMaxYMin slice"
      aria-hidden="true"
    >
      {LINES.map(({ line, d, stations }) => (
        <g key={line} className={`line-${line}`}>
          <path className="sysmap-route" d={d} />
          {stations.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} className="sysmap-stop" cx={cx} cy={cy} r="8" />
          ))}
        </g>
      ))}
    </svg>
  );
}
