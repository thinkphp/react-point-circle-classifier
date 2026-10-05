import { useState } from "react";

const EPS = 0.00001;

// -1 = interior, 0 = pe cerc, 1 = exterior (aceeasi logica ca in C, fara radical)
function pozitie(cx, cy, r, px, py) {
  const d2 = (px - cx) ** 2 + (py - cy) ** 2;
  const r2 = r ** 2;
  const diff = d2 - r2;
  if (Math.abs(diff) <= EPS * Math.max(r2, 1)) return 0;
  return diff < 0 ? -1 : 1;
}

const REZ = {
  "-1": { text: "în interiorul cercului", color: "#16a34a" },
  0: { text: "pe cerc", color: "#d97706" },
  1: { text: "în exteriorul cercului", color: "#dc2626" },
};

function Camp({ label, value, onChange }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", fontSize: 13, gap: 4 }}>
      {label}
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: 6, border: "1px solid #bbb", borderRadius: 6, width: 90 }}
      />
    </label>
  );
}

export default function CercPunct() {
  const [cx, setCx] = useState("0");
  const [cy, setCy] = useState("0");
  const [r, setR] = useState("5");
  const [px, setPx] = useState("3");
  const [py, setPy] = useState("4");

  const [Cx, Cy, R, Px, Py] = [cx, cy, r, px, py].map(parseFloat);
  const valid = [Cx, Cy, R, Px, Py].every((v) => Number.isFinite(v)) && R > 0;

  let rez = null;
  let svg = null;
  if (valid) {
    rez = REZ[pozitie(Cx, Cy, R, Px, Py)];

    // Limitele desenului (axa y inversata pentru SVG)
    const minX = Math.min(Cx - R, Px), maxX = Math.max(Cx + R, Px);
    const minY = Math.min(Cy - R, Py), maxY = Math.max(Cy + R, Py);
    const size = Math.max(maxX - minX, maxY - minY) * 1.2;
    const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2;
    const stroke = size / 150;
    svg = {
      viewBox: `${midX - size / 2} ${-(midY + size / 2)} ${size} ${size}`,
      stroke,
    };
  }

  return (
    <div style={{ maxWidth: 420, margin: "24px auto", fontFamily: "system-ui, sans-serif", padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Punct și cerc</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <Camp label="Centru x" value={cx} onChange={setCx} />
        <Camp label="Centru y" value={cy} onChange={setCy} />
        <Camp label="Raza R" value={r} onChange={setR} />
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <Camp label="Punct x" value={px} onChange={setPx} />
        <Camp label="Punct y" value={py} onChange={setPy} />
      </div>

      {!valid ? (
        <p style={{ color: "#dc2626" }}>Completează toate câmpurile; raza trebuie să fie pozitivă.</p>
      ) : (
        <>
          <p style={{ fontSize: 16 }}>
            Punctul P({Px}, {Py}) este{" "}
            <strong style={{ color: rez.color }}>{rez.text}</strong>.
          </p>
          <svg
            viewBox={svg.viewBox}
            style={{ width: "100%", background: "#f8f8f8", border: "1px solid #ddd", borderRadius: 8 }}
          >
            {/* y inversat: desenam cu -y */}
            <circle
              cx={Cx}
              cy={-Cy}
              r={R}
              fill="rgba(59,130,246,0.12)"
              stroke="#3b82f6"
              strokeWidth={svg.stroke}
            />
            <circle cx={Cx} cy={-Cy} r={svg.stroke * 2} fill="#3b82f6" />
            <circle cx={Px} cy={-Py} r={svg.stroke * 3} fill={rez.color} />
          </svg>
        </>
      )}
    </div>
  );
}
