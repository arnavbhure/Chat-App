const express = require("express");
const authRouter = require("./src/Routers/authRouter");
const dotenv = require("dotenv");
const { connectDB } = require("./src/lib/db");
const cors = require("cors");
const ProfileRouter = require("./src/Routers/profileRouter");

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", ProfileRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
