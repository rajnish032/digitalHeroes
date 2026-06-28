import React from "react";
import { useFadeUp } from "../../hooks/useFadeUp.js";

const STEPS = [
  {
    num: "Step 01",
    icon: "🎯",
    title: "Subscribe",
    desc: "Pick a monthly or yearly plan. Your subscription funds the prize pool and your chosen charity automatically.",
  },
  {
    num: "Step 02",
    icon: "⛳",
    title: "Enter Your Scores",
    desc: "Log your last 5 Stableford scores (1–45). We always keep the 5 most recent — simple and rolling.",
  },
  {
    num: "Step 03",
    icon: "🎲",
    title: "Enter the Draw",
    desc: "Your scores automatically enter you into the monthly draw. Match 3, 4, or all 5 numbers to win your tier.",
  },
  {
    num: "Step 04",
    icon: "🏆",
    title: "Verify & Collect",
    desc: "Winners upload proof from their golf platform. Once verified by our team, your prize is paid out.",
  },
];

export default function HowItWorks() {
  const ref = useFadeUp();

  return (
    <section
      id="how"
      className="px-[5vw] py-24"
      style={{ background: "#111827" }}
      ref={ref}
    >
      <p
        className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3"
        style={{ color: "#8A8FA8" }}
      >
        The Process
      </p>
      <h2
        className="font-extrabold tracking-tight text-4xl md:text-5xl leading-tight mb-3"
        style={{ color: "#F5F5F0" }}
      >
        Four steps to <span style={{ color: "#00E87A" }}>everything</span>
      </h2>
      <p className="text-base max-w-md mb-14" style={{ color: "#8A8FA8" }}>
        From signing up to collecting your winnings — here's exactly how
        GreenDraw works.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STEPS.map((step) => (
          <div key={step.num} className="fade-up">
            <div
              className="rounded-2xl p-8 cursor-default transition-all duration-200 h-full"
              style={{
                background: "#141C2E",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,232,122,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <p
                className="text-[11px] font-bold tracking-[0.1em] uppercase mb-5"
                style={{ color: "#00E87A" }}
              >
                {step.num}
              </p>
              <span className="text-3xl mb-4 block">{step.icon}</span>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: "#F5F5F0" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#8A8FA8" }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
