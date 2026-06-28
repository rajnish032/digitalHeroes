import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiLoader } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { useSubscription } from "../../contexts/SubscriptionContext";

const NAV_ITEMS = [
  { label: "How It Works", href: "#how" },
  { label: "Charity", href: "#charity" },
  { label: "Prizes", href: "#prizes" },
  { label: "Plans", href: "#plans" },
];

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout, loading } = useAuth();
  const {
    subscription,
    loading: subscriptionLoading,
  } = useSubscription();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <nav
        style={{
          background: "rgba(10,15,30,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-5 transition-shadow duration-300 ${
          scrolled
            ? "shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
            : ""
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-xl font-extrabold tracking-tight bg-transparent border-none cursor-pointer"
          style={{ color: "#F5F5F0" }}
        >
          Green<span style={{ color: "#00E87A" }}>Draw</span>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => scrollTo(item.href)}
                className="text-sm font-medium border-none cursor-pointer p-0 transition-colors duration-200 hover:text-white bg-transparent"
                style={{ color: "#8A8FA8" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#F5F5F0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#8A8FA8")
                }
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {loading || subscriptionLoading ? (
            <div className="flex items-center gap-2 text-white text-sm">
              <FiLoader className="animate-spin" />
              Loading...
            </div>
          ) : user ? (
            <>
              {subscription && (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="font-bold text-sm px-5 py-2 rounded-full border-none cursor-pointer transition-opacity hover:opacity-85"
                  style={{
                    background: "#00E87A",
                    color: "#0A0F1E",
                  }}
                >
                  Dashboard
                </button>
              )}

              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 font-bold text-sm px-4 py-2 rounded-full border transition-all hover:bg-red-500 hover:text-white"
                style={{
                  borderColor: "#ef4444",
                  color: "#ef4444",
                  background: "transparent",
                }}
              >
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="font-bold text-sm px-5 py-2 rounded-full border-none cursor-pointer transition-opacity hover:opacity-85"
              style={{
                background: "#00E87A",
                color: "#0A0F1E",
              }}
            >
              Login
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 border-none cursor-pointer bg-transparent"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-0.5 rounded"
              style={{ background: "#F5F5F0" }}
            />
            <span
              className="block w-5 h-0.5 rounded"
              style={{ background: "#F5F5F0" }}
            />
            <span
              className="block w-5 h-0.5 rounded"
              style={{ background: "#F5F5F0" }}
            />
          </button>
        </div>
      </nav>

            {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-[72px] left-0 right-0 z-40 px-[5vw] py-6 flex flex-col gap-5"
          style={{
            background: "#111827",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Navigation Links */}
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-base text-left border-none cursor-pointer font-medium bg-transparent"
              style={{ color: "#F5F5F0" }}
            >
              {item.label}
            </button>
          ))}

          <div className="border-t border-gray-700 pt-4 flex flex-col gap-4">
            {loading || subscriptionLoading ? (
              <div className="flex items-center gap-2 text-white">
                <FiLoader className="animate-spin" />
                Loading...
              </div>
            ) : user ? (
              <>
                {/* Show Dashboard only if subscription is active */}
                {subscription && (
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setMenuOpen(false);
                    }}
                    className="text-left font-semibold"
                    style={{ color: "#00E87A" }}
                  >
                    Dashboard
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left font-semibold"
                  style={{ color: "#ef4444" }}
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/auth/login");
                  setMenuOpen(false);
                }}
                className="text-left font-semibold"
                style={{ color: "#00E87A" }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}