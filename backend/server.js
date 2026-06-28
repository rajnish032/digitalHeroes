if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const connectDB = require("./config/db");
connectDB();
// require("./utils/cronJobs");

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = process.env.PORT;

const ExpressError = require("./utils/ExpressError");
const authRoute = require("./routes/authRoute");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const charityRoutes = require("./routes/charityRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const drawRoutes = require("./routes/drawRoutes");
const winnerRoutes = require("./routes/winnerRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const webhookRoutes = require("./routes/webhookRoutes");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // ✅ Middleware for handling cookies

corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // Allow cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions)); // ✅ CORS Middleware

app.use("/api/auth", authRoute);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/charity", charityRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/winner", winnerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/webhook", webhookRoutes);




app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Not a Valid Route"));
});

//Error Handling Middleware

app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong!!" } = err;
  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`App Listening To Port ${port}`);
});
