import { useState } from "react";

const EPS = 0.00001;

// -1 = inside, 0 = on the circle, 1 = outside
function pozitie(cx, cy, r, px, py) {
  const d2 = (px - cx) ** 2 + (py - cy) ** 2;
  const r2 = r ** 2;
  const diff = d2 - r2;
  if (Math.abs(diff) <= EPS * Math.max(r2, 1)) return 0;
  return diff < 0 ? -1 : 1;
}

const REZ = {
  "-1": { text: "Inside", color: "#4f9b78", icon: "↘" },
  0: { text: "On the circle", color: "#d49448", icon: "◎" },
  1: { text: "Outside", color: "#d46b62", icon: "↗" },
};

function Camp({ label, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type="number" step="any" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Grid({ svg, Cx, Cy, R, Px, Py, rez }) {
  return (
    <svg className="plot" viewBox={svg.viewBox} role="img" aria-label={`Circle centered at (${Cx}, ${Cy}) with point P(${Px}, ${Py})`}>
      <defs>
        <pattern id="grid" width={svg.grid} height={svg.grid} patternUnits="userSpaceOnUse">
          <path d={`M ${svg.grid} 0 L 0 0 0 ${svg.grid}`} fill="none" stroke="#e8e9e6" strokeWidth={svg.stroke * 0.42} />
        </pattern>
      </defs>
      <rect x={svg.x} y={svg.y} width={svg.size} height={svg.size} fill="url(#grid)" />
      <line x1={svg.x} y1={-Cy} x2={svg.x + svg.size} y2={-Cy} stroke="#d6d9d4" strokeWidth={svg.stroke * 0.65} />
      <line x1={Cx} y1={svg.y} x2={Cx} y2={svg.y + svg.size} stroke="#d6d9d4" strokeWidth={svg.stroke * 0.65} />
      <circle cx={Cx} cy={-Cy} r={R} fill="rgba(108, 151, 133, .12)" stroke="#719784" strokeWidth={svg.stroke * 1.35} />
      <circle cx={Cx} cy={-Cy} r={svg.stroke * 2.8} fill="#719784" />
      <circle cx={Px} cy={-Py} r={svg.stroke * 4.4} fill={rez.color} stroke="white" strokeWidth={svg.stroke * 1.5} />
      <text x={Cx + svg.stroke * 6} y={-Cy - svg.stroke * 6} fontSize={svg.stroke * 8} fill="#587767">C</text>
      <text x={Px + svg.stroke * 7} y={-Py - svg.stroke * 6} fontSize={svg.stroke * 8} fill="#5c625d">P</text>
    </svg>
  );
}

export default function CercPunct() {
  const [cx, setCx] = useState("0");
  const [cy, setCy] = useState("0");
  const [r, setR] = useState("5");
  const [px, setPx] = useState("3");
  const [py, setPy] = useState("4");

  const [Cx, Cy, R, Px, Py] = [cx, cy, r, px, py].map(parseFloat);
  const valid = [Cx, Cy, R, Px, Py].every(Number.isFinite) && R > 0;
  let rez = null;
  let svg = null;
  let distance = null;

  if (valid) {
    rez = REZ[pozitie(Cx, Cy, R, Px, Py)];
    distance = Math.hypot(Px - Cx, Py - Cy);
    const minX = Math.min(Cx - R, Px), maxX = Math.max(Cx + R, Px);
    const minY = Math.min(Cy - R, Py), maxY = Math.max(Cy + R, Py);
    const size = Math.max(maxX - minX, maxY - minY) * 1.3;
    const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2;
    const x = midX - size / 2, y = -(midY + size / 2);
    svg = { x, y, size, grid: size / 12, viewBox: `${x} ${y} ${size} ${size}`, stroke: size / 170 };
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Point and circle, home">
          <span className="brand-mark"><i /></span>
          <span>GEOMETRY <b>·</b> LAB</span>
        </a>
        <span className="top-note"><span className="live-dot" /> Interactive tool</span>
      </header>

      <section className="intro" id="top">
        <div className="eyebrow">ANALYTIC GEOMETRY <span>01 / 03</span></div>
        <h1>Point &amp; <em>circle.</em></h1>
        <p>Explore a point’s position relative to a circle. Adjust the coordinates and see the result instantly.</p>
      </section>

      <section className="workspace" aria-label="Point and circle classifier">
        <div className="controls-card">
          <div className="card-heading">
            <div><span className="step">01</span><h2>Define the geometry</h2></div>
            <span className="hint">Values update live</span>
          </div>

          <div className="group-label"><span className="key center-key">C</span><span>CIRCLE</span><span className="group-rule" /></div>
          <div className="fields two-fields">
            <Camp label="Center · x" value={cx} onChange={setCx} />
            <Camp label="Center · y" value={cy} onChange={setCy} />
          </div>
          <div className="fields radius-field">
            <Camp label="Radius · r" value={r} onChange={setR} />
            <span className="field-note">r &gt; 0</span>
          </div>

          <div className="group-label point-label"><span className="key point-key">P</span><span>POINT</span><span className="group-rule" /></div>
          <div className="fields two-fields">
            <Camp label="Coordinate · x" value={px} onChange={setPx} />
            <Camp label="Coordinate · y" value={py} onChange={setPy} />
          </div>

          <div className="formula-box">
            <span className="formula-label">CRITERION</span>
            <span className="formula">(x − x<sub>c</sub>)² + (y − y<sub>c</sub>)² <b>↔</b> r²</span>
          </div>
        </div>

        <div className="visual-card">
          <div className="card-heading visual-heading">
            <div><span className="step">02</span><h2>Visualization</h2></div>
            <span className="axis-tag">x <b>·</b> y</span>
          </div>
          {valid ? (
            <>
              <div className="plot-wrap"><Grid svg={svg} Cx={Cx} Cy={Cy} R={R} Px={Px} Py={Py} rez={rez} /></div>
              <div className="legend">
            <span><i className="legend-circle" />Circle</span>
                <span><i className="legend-center" />Center</span>
                <span><i className="legend-point" style={{ background: rez.color }} />Point P</span>
              </div>
            </>
          ) : (
            <div className="invalid-plot"><span>!</span><p>Enter all coordinates<br />and a positive radius.</p></div>
          )}
        </div>
      </section>

      <section className={`result-card ${valid ? "" : "result-invalid"}`} aria-live="polite">
        <div className="result-copy">
          <span className="result-label"><span className="step">03</span> ANALYSIS RESULT</span>
          {valid ? <h2>Point <span className="point-inline">P({Px}, {Py})</span> is <em style={{ color: rez.color }}>{rez.text.toLowerCase()}</em>.</h2> : <h2>Check the values you entered.</h2>}
        </div>
        {valid && <div className="result-metrics">
          <div><span>DISTANCE · CP</span><strong>{distance.toLocaleString("en-US", { maximumFractionDigits: 3 })}</strong></div>
          <div><span>RADIUS · r</span><strong>{R.toLocaleString("en-US", { maximumFractionDigits: 3 })}</strong></div>
          <div className="result-icon" style={{ color: rez.color }}>{rez.icon}</div>
        </div>}
      </section>

      <footer><span>A geometry exercise, in real time.</span><span>MATH <b>×</b> INTERACTIVE</span></footer>
    </main>
  );
}
