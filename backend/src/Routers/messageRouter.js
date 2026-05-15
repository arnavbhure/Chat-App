const express = require("express");
const protectedRoute = require("../middlewares/ProtectedRoute");
const getUsersForSidebarController = require("../controllers/messages/getUsersForSidebarController");
const getMessagesController = require("../controllers/messages/getMessagesController");
const sendMessageController = require("../controllers/messages/sendMessageController");

const messageRouter = express.Router();

messageRouter.get("/users", protectedRoute, getUsersForSidebarController);
messageRouter.get("/:id", protectedRoute, getMessagesController);
messageRouter.post("/send/:id", sendMessageController);

module.exports = messageRouter;
