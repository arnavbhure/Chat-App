const express = require("express");
const signupController = require("../controllers/auth/signupController");
const loginController = require("../controllers/auth/loginController");
const logoutController = require("../controllers/auth/logoutController");

const authRouter = express.Router();

authRouter.post("/signup", signupController);

authRouter.post("/login", loginController);

authRouter.post("/logout", logoutController);

module.exports = authRouter;
