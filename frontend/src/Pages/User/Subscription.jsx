// import Sidebar from "../../components/Dashboard/Sidebar";
// import Navbar from "../../components/Navbar";

// import SubscriptionCard from "../../components/subscription/SubscriptionCard";
// import PlanCard from "../../components/subscription/PlanCard";

// import { useSubscription } from "../../contexts/SubscriptionContext";

// const monthlyFeatures = [
//   "Participate in Monthly Draw",
//   "Submit Golf Scores",
//   "Choose Your Favourite Charity",
//   "Win Monthly Cash Prizes",
//   "Dashboard Access",
// ];

// const yearlyFeatures = [
//   "Everything in Monthly Plan",
//   "Priority Support",
//   "12 Months Access",
//   "Higher Prize Eligibility",
//   "Best Value Plan",
// ];

// const Subscription = () => {
//   const {
//     subscription,
//     loading,
//     createSubscription,
//     cancelSubscription,
//   } = useSubscription();

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 ml-64">
//         <Navbar />

//         <main className="pt-20 p-6">
//           {/* Header */}
//           <div className="mb-6">
//             <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-1">
//               Dashboard
//             </p>

//             <h1 className="text-2xl font-semibold text-gray-900">
//               Subscription
//             </h1>
//           </div>

//           {/* Current Subscription */}
//           <div className="max-w-md mb-8">
//             <SubscriptionCard
//               subscription={subscription}
//               loading={loading}
//               onCancel={cancelSubscription}
//             />
//           </div>

//           {/* Plans */}
//           <div>
//             <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-3">
//               Available Plans
//             </p>

//             <div className="grid lg:grid-cols-2 gap-6">
//               <PlanCard
//                 title="Monthly Plan"
//                 price={999}
//                 duration="Month"
//                 features={monthlyFeatures}
//                 loading={loading}
//                 active={subscription?.plan === "monthly"}
//                 onSubscribe={() => createSubscription("monthly")}
//               />

//               <PlanCard
//                 title="Yearly Plan"
//                 price={9999}
//                 duration="Year"
//                 features={yearlyFeatures}
//                 loading={loading}
//                 active={subscription?.plan === "yearly"}
//                 popular
//                 onSubscribe={() => createSubscription("yearly")}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Subscription;

import Sidebar from "../../components/Dashboard/Sidebar";
import Navbar from "../../components/Navbar";

import SubscriptionCard from "../../components/subscription/SubscriptionCard";
import PlanCard from "../../components/subscription/PlanCard";

import { useSubscription } from "../../contexts/SubscriptionContext";
import { useRazorpay } from "../../hooks/useRazorpay";

const monthlyFeatures = [
  "Participate in Monthly Draw",
  "Submit Golf Scores",
  "Choose Your Favourite Charity",
  "Win Monthly Cash Prizes",
  "Dashboard Access",
];

const yearlyFeatures = [
  "Everything in Monthly Plan",
  "Priority Support",
  "12 Months Access",
  "Higher Prize Eligibility",
  "Best Value Plan",
];

const Subscription = () => {
  const {
    subscription,
    loading,
    cancelSubscription,
  } = useSubscription();

  const { openCheckout } = useRazorpay();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <main className="pt-20 p-6">
          {/* Header */}
          <div className="mb-6">
            <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-1">
              Dashboard
            </p>

            <h1 className="text-2xl font-semibold text-gray-900">
              Subscription
            </h1>
          </div>

          {/* Current Subscription */}
          <div className="max-w-md mb-8">
            <SubscriptionCard
              subscription={subscription}
              loading={loading}
              onCancel={cancelSubscription}
            />
          </div>

          {/* Plans */}
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-3">
              Available Plans
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              <PlanCard
                title="Monthly Plan"
                price={499}
                duration="Month"
                features={monthlyFeatures}
                loading={loading}
                active={
                  subscription?.plan === "monthly" &&
                  subscription?.status === "active"
                }
                onSubscribe={() => openCheckout("monthly")}
              />

              <PlanCard
                title="Yearly Plan"
                price={4999}
                duration="Year"
                features={yearlyFeatures}
                loading={loading}
                active={
                  subscription?.plan === "yearly" &&
                  subscription?.status === "active"
                }
                popular
                onSubscribe={() => openCheckout("yearly")}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Subscription;