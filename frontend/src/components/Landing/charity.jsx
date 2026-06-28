import React from "react";
import { useFadeUp } from "../../hooks/useFadeUp";

const STATS = [
  { num: "₹48,200", desc: "Donated to charities this year", pct: 78 },
  { num: "12", desc: "Active charities in the directory", pct: 45 },
  { num: "94%", desc: "Members give 10% or more", pct: 94 },
];

const FEATURES = [
  { icon: "❤️", text: "Choose from a curated directory of charities" },
  { icon: "📈", text: "Increase your contribution percentage voluntarily" },
  {
    icon: "🗓",
    text: "Charity profiles feature golf events & fundraising days",
  },
  { icon: "💸", text: "Donate independently, separate from gameplay" },
];

export default function Charity() {
  const ref = useFadeUp();

  return (
    <section
      id="charity"
      className="px-[5vw] py-24 overflow-hidden"
      style={{ background: "#0A0F1E" }}
      ref={ref}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="fade-up">
          <p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3"
            style={{ color: "#8A8FA8" }}
          >
            Impact First
          </p>
          <h2
            className="font-extrabold tracking-tight text-4xl md:text-5xl leading-tight mb-4"
            style={{ color: "#F5F5F0" }}
          >
            Every round,
            <br />
            <span style={{ color: "#00E87A" }}>someone wins</span>
            <br />
            more than a prize
          </h2>
          <p className="text-base max-w-sm mb-8" style={{ color: "#8A8FA8" }}>
            10% of every subscription goes directly to your chosen charity — and
            you can give more, any time.
          </p>
          <div className="flex flex-col gap-3">
            {FEATURES.map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
                style={{
                  background: "rgba(255,95,75,0.08)",
                  border: "1px solid rgba(255,95,75,0.15)",
                  color: "#F5F5F0",
                }}
              >
                <span className="text-xl">{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up">
          <div
            className="rounded-2xl p-10"
            style={{
              background: "#141C2E",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {STATS.map((s, i) => (
              <div key={s.desc} className={i < STATS.length - 1 ? "mb-7" : ""}>
                <p
                  className="font-extrabold text-5xl tracking-tighter leading-none"
                  style={{ color: "#FF5F4B" }}
                >
                  {s.num}
                </p>
                <div
                  className="rounded-full h-1.5 my-2.5"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="rounded-full h-1.5"
                    style={{ width: `${s.pct}%`, background: "#FF5F4B" }}
                  />
                </div>
                <p className="text-sm" style={{ color: "#8A8FA8" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
