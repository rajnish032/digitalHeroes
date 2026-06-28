# 🏌️ JWT Golf Charity Draw Platform

A full-stack MERN application where golfers submit daily scores, participate in monthly prize draws, and donate a portion of their subscription to their selected charity.

---

## ✨ Features

### 👤 Authentication
- JWT Authentication
- Email Verification
- Forgot Password
- Reset Password
- Protected Routes
- Admin Authentication

### 💳 Subscription
- Monthly & Yearly Plans
- Razorpay Payment Integration
- Active Subscription Management
- Subscription Expiry Tracking

### ⛳ Score System
- One Golf Score Per Day
- Score Validation
- Score History
- Last 5 Scores
- Average Score

### 🎲 Monthly Draw
- Admin Runs Monthly Draw
- Random Winning Numbers
- Prize Pool Distribution
- Jackpot Rollover
- Published Draw Results

### 🏆 Winner Management
- Automatic Winner Detection
- Match Tier (3,4,5 Match)
- Upload Payment Proof
- Admin Approval
- Reject Winner
- Mark Winner Paid

### ❤️ Charity
- Browse Available Charities
- Select Favourite Charity
- Charity Contribution Tracking
- Admin Charity Management

### 📊 Dashboard
- Subscription Details
- Latest Draw
- Draw History
- Selected Charity
- Recent Winnings
- Latest Scores
- Statistics

### 👨‍💼 Admin Panel
- Dashboard Analytics
- User Management
- Charity Management
- Draw Management
- Winner Management

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify
- Lucide Icons

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Razorpay
- SES

---

# 📁 Project Structure

```
Digital Hero
│
backend
│
├── config
│   ├── db.js
│   └── razorpay.js
│
├── controllers
│   ├── adminController.js
│   ├── auth.js
│   ├── charity.js
│   ├── dashboardController.js
│   ├── drawController.js
│   ├── paymentController.js
│   ├── scoreController.js
│   ├── subscription.js
│   ├── webhookController.js
│   └── winnerController.js
│
├── middleware
│   ├── authenticate.js
│   ├── checkSubscription.js
│   ├── isAdmin.js
│   └── subscriptionCheck.js
│
├── models
│   ├── charity.js
│   ├── Donation.js
│   ├── draw.js
│   ├── emailToken.js
│   ├── score.js
│   ├── session.js
│   ├── subscription.js
│   ├── user.js
│   └── winner.js
│
├── routes
│   ├── adminRoutes.js
│   ├── authRoute.js
│   ├── charityRoutes.js
│   ├── dashboardRoutes.js
│   ├── drawRoutes.js
│   ├── paymentRoutes.js
│   ├── scoreRoutes.js
│   ├── subscriptionRoutes.js
│   ├── webhookRoutes.js
│   └── winnerRoutes.js
│
├── utils
│   ├── cronJobs.js
│   ├── draw.js
│   ├── ExpressError.js
│   ├── mailTemplates.js
│   ├── sendEmail.js
│   └── wrapAsync.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │
│   ├── assets
│   │
│   ├── components
│   │   │
│   │   ├── Admin
│   │   │   ├── Charity
│   │   │   ├── Dashboard
│   │   │   ├── Draw
│   │   │   ├── Users
│   │   │   └── Winner
│   │   │
│   │   ├── Dashboard
│   │   ├── Landing
│   │   ├── Protected
│   │   ├── Subscription
│   │   ├── Navbar.jsx
│   │   ├── Loader.jsx
│   │   ├── DrawCard.jsx
│   │   ├── ScoreForm.jsx
│   │   ├── ScoreTable.jsx
│   │   ├── UploadProofModal.jsx
│   │   └── WinnerCard.jsx
│   │
│   ├── contexts
│   │   ├── AuthContext.jsx
│   │   ├── CharityContext.jsx
│   │   ├── DashboardContext.jsx
│   │   ├── DrawContext.jsx
│   │   ├── ScoreContext.jsx
│   │   ├── SubscriptionContext.jsx
│   │   └── WinnerContext.jsx
│   │
│   ├── hooks
│   │   ├── useFadeUp.js
│   │   └── useRazorpay.js
│   │
│   ├── Pages
│   │   ├── Admin
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── AdminCharities.jsx
│   │   │   ├── AdminDraws.jsx
│   │   │   └── AdminWinners.jsx
│   │   │
│   │   ├── User
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Scores.jsx
│   │   │   ├── Draw.jsx
│   │   │   ├── Charity.jsx
│   │   │   ├── Subscription.jsx
│   │   │   └── Winnings.jsx
│   │   │
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Verify.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

### Backend (.env)

```env
JWT_SECRET=
FRONTEND_URL=



AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
SES_FROM_EMAIL=



RAZORPAY_WEBHOOK_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

# 🚀 Application Flow

```
User Registration
        │
        ▼
Email Verification
        │
        ▼
Login
        │
        ▼
Purchase Subscription
        │
        ▼
Select Charity
        │
        ▼
Submit Daily Golf Scores
        │
        ▼
Admin Runs  Draw
        │
        ▼
Winning Numbers Generated
        │
        ▼
Winners Calculated
        │
        ▼
Admin Publishes Draw
        │
        ▼
Users View Results
        │
        ▼
Winner Uploads Proof
        │
        ▼
Admin Approves Payment
        │
        ▼
Prize Paid
```

---

# 👨‍💻 Author

**Rajnish Kumar**

Full Stack Developer (MERN)

- React.js
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Razorpay Integration