const express = require("express");
const authRouter = require("./src/Routers/authRouter");
const dotenv = require("dotenv");
const { connectDB } = require("./src/lib/db");
const cors = require("cors");
const ProfileRouter = require("./src/Routers/profileRouter");
const cookieParser = require("cookie-parser");
const checkAuthController = require("./src/controllers/checkAuthController");

dotenv.config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", ProfileRouter);
app.use("/api/check", checkAuthController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
