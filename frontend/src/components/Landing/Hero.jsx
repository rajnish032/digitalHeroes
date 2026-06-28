import React from "react";
import JackpotTicker from "./JackpotTicker";

const TRUST = [
  "✓ PCI-Compliant Payments",
  "✓ Cancel Anytime",
  "✓ 10%+ Goes to Charity",
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-[5vw] pt-32 pb-16 overflow-hidden"
      style={{ background: "#0A0F1E" }}
    >
      {/* Radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(0,232,122,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(255,95,75,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Live badge */}
      <div
        className="relative z-10 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full mb-7"
        style={{
          background: "rgba(0,232,122,0.1)",
          border: "1px solid rgba(0,232,122,0.25)",
          color: "#00E87A",
        }}
      >
        <span
          className="live-dot inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: "#00E87A" }}
        />
        Monthly Draw Open
      </div>

      {/* Headline */}
      <h1
        className="relative z-10 font-extrabold tracking-[-0.04em] leading-[1.05] text-5xl md:text-7xl lg:text-[5.5rem] max-w-4xl mb-6"
        style={{ color: "#F5F5F0" }}
      >
        Play golf.
        <br />
        <span style={{ color: "#00E87A" }}>Change lives.</span>
        <br />
        Win big.
      </h1>

      <p
        className="relative z-10 text-lg md:text-xl max-w-lg mb-10"
        style={{ color: "#8A8FA8" }}
      >
        Enter your Stableford scores, support your chosen charity, and compete
        in a monthly prize draw — all in one place.
      </p>

      <div className="relative z-10">
        <JackpotTicker target={14840} />
      </div>

      {/* CTAs */}
      <div className="relative z-10 flex flex-wrap gap-4 justify-center">
        <button
          className="font-bold text-base px-9 py-3.5 rounded-full border-none cursor-pointer transition-all duration-150 hover:-translate-y-0.5"
          style={{
            background: "#00E87A",
            color: "#0A0F1E",
            boxShadow: "0 0 32px rgba(0,232,122,0.35)",
          }}
        >
          Subscribe &amp; Enter Draw
        </button>
        <button
          onClick={() =>
            document
              .querySelector("#how")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="font-medium text-base px-9 py-3.5 rounded-full cursor-pointer transition-colors duration-200"
          style={{
            background: "transparent",
            color: "#F5F5F0",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
          }
        >
          See How It Works
        </button>
      </div>

      {/* Trust bar */}
      <div
        className="relative z-10 flex flex-wrap items-center justify-center gap-5 mt-14 text-sm"
        style={{ color: "#8A8FA8" }}
      >
        {TRUST.map((item, i) => (
          <React.Fragment key={item}>
            <span>{item}</span>
            {i < TRUST.length - 1 && (
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.15)" }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
