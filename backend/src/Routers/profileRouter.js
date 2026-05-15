const express = require("express");
const updateProfileController = require("../controllers/profile/updateProfileController");
const protectedRoute = require("../middlewares/ProtectedRoute");
const ProfileRouter = express.Router();

ProfileRouter.put("/update-profile", protectedRoute, updateProfileController);

module.exports = ProfileRouter;
