import React, { useState, useEffect, useRef } from "react";

export default function JackpotTicker({
  target = 14840,
  currency = "₹",
  duration = 1800,
  delay = 400,
}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      else setValue(target);
    };
    const timer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay);
    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return (
    <div
      className="rounded-2xl px-10 py-5 mb-10 inline-flex flex-col items-center gap-1"
      style={{ background: "#141C2E", border: "1px solid rgba(0,232,122,0.2)" }}
    >
      <span
        className="text-[11px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: "#8A8FA8" }}
      >
        Current Jackpot Pool
      </span>
      <span
        className="font-extrabold tracking-tighter tabular-nums text-5xl md:text-6xl leading-none"
        style={{ color: "#00E87A" }}
      >
        {currency}
        {value.toLocaleString("en-GB")}
      </span>
      <span className="text-xs mt-1" style={{ color: "#8A8FA8" }}>
        Rolls over if unclaimed · Grows every month
      </span>
    </div>
  );
}
