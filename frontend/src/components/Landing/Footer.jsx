import React from "react";

const LINKS = [
  { label: "How It Works", href: "#how" },
  { label: "Charities", href: "#charity" },
  { label: "Prize Pools", href: "#prizes" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  const scrollTo = (href) => {
    if (href === "#") return;
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="px-[5vw] py-12 flex flex-wrap items-center justify-between gap-6"
      style={{
        background: "#111827",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <a
        href="#"
        className="font-extrabold text-lg tracking-tight no-underline"
        style={{ color: "#F5F5F0" }}
      >
        Green<span style={{ color: "#00E87A" }}>Draw</span>
      </a>
      <nav className="flex flex-wrap gap-6">
        {LINKS.map((l) => (
          <button
            key={l.label}
            onClick={() => scrollTo(l.href)}
            className="text-sm border-none cursor-pointer p-0 transition-colors duration-200"
            style={{ background: "transparent", color: "#8A8FA8" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8FA8")}
          >
            {l.label}
          </button>
        ))}
      </nav>
      <span className="text-xs" style={{ color: "#8A8FA8" }}>
        © 2026 GreenDraw. All rights reserved.
      </span>
    </footer>
  );
}
