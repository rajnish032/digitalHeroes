import React, { useState } from "react";
import { Check } from "lucide-react";

import { useFadeUp } from "../../hooks/useFadeUp";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { useRazorpay } from "../../hooks/useRazorpay";

export const PLANS = [
  {
    id: "monthly",
    title: "Monthly Plan",
    duration: "Month",
    price: 999,
    desc: "Participate every month with full access.",
    popular: false,
    cta: "Subscribe Now",
    features: [
      "Participate in Monthly Draw",
      "Submit Golf Scores",
      "Choose Your Favourite Charity",
      "Win Monthly Cash Prizes",
      "Dashboard Access",
    ],
  },
  {
    id: "yearly",
    title: "Yearly Plan",
    duration: "Year",
    price: 9999,
    desc: "Best value with priority benefits.",
    popular: true,
    savings: "Save 17%",
    cta: "Get Yearly Plan",
    features: [
      "Everything in Monthly Plan",
      "Priority Support",
      "12 Months Access",
      "Higher Prize Eligibility",
      "Best Value Plan",
    ],
  },
];

export default function Pricing() {
  const ref = useFadeUp();

  const { subscription } = useSubscription();
  const { openCheckout } = useRazorpay();

  const [processingPlan, setProcessingPlan] = useState(null);

  const handleSubscribe = async (planId) => {
    try {
      setProcessingPlan(planId);

      await openCheckout(planId);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingPlan(null);
    }
  };

  return (
    <section
      id="plans"
      ref={ref}
      className="px-[5vw] py-24 bg-[#111827]"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-semibold">
          Pricing
        </p>

        <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">
          Choose your{" "}
          <span className="text-[#00E87A]">membership</span>
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl">
          Join our monthly golf draws and support your favourite
          charity while competing for exciting prizes.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {PLANS.map((plan) => {
            const active =
              subscription?.plan === plan.id &&
              subscription?.status === "active";

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  active
                    ? "border border-green-500 bg-green-500/5"
                    : plan.popular
                    ? "border border-[#00E87A]"
                    : "border border-white/10"
                } bg-[#141C2E]`}
              >
                {plan.popular && !active && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00E87A] text-[#111827] text-xs font-bold rounded-full px-4 py-1">
                    MOST POPULAR
                  </div>
                )}

                {active && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-semibold rounded-full px-4 py-1">
                    CURRENT PLAN
                  </div>
                )}

                <p className="uppercase text-xs tracking-widest text-gray-400 font-semibold">
                  {plan.duration}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  {plan.title}
                </h3>

                <div className="mt-5 flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-white">
                    ₹{plan.price}
                  </span>

                  <span className="text-gray-400 pb-2">
                    /{plan.duration === "Month" ? "mo" : "yr"}
                  </span>
                </div>

                <p className="mt-3 text-gray-400">
                  {plan.desc}
                </p>

                {plan.savings && (
                  <div className="mt-2 text-green-400 text-sm font-medium">
                    {plan.savings}
                  </div>
                )}

                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-white"
                    >
                      <Check
                        size={18}
                        className="text-[#00E87A] flex-shrink-0"
                      />

                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  disabled={processingPlan === plan.id || active}
                  onClick={() => handleSubscribe(plan.id)}
                  className={`mt-10 w-full py-4 rounded-full font-semibold transition ${
                    active
                      ? "bg-green-600 text-white cursor-default"
                      : plan.popular
                      ? "bg-[#00E87A] text-[#111827] hover:opacity-90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  } disabled:opacity-60`}
                >
                  {processingPlan === plan.id
                    ? "Processing..."
                    : active
                    ? "Current Plan"
                    : plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}