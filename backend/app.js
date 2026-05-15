const express = require("express");
const authRouter = require("./src/Routers/authRouter");
const dotenv = require("dotenv");
const { connectDB } = require("./src/lib/db");
const cors = require("cors");
const ProfileRouter = require("./src/Routers/profileRouter");
const cookieParser = require("cookie-parser");
const checkAuthController = require("./src/controllers/checkAuthController");
const messageRouter = require("./src/Routers/messageRouter");

dotenv.config();

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", ProfileRouter);
app.use("/api/auth/check", checkAuthController);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
