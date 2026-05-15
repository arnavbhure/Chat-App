const Message = require("../../models/messageSchema");

const getMessagesController = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });

    return res.status(200).json({ success: true, messages });
  } catch (err) {
    console.log("Error in getMessagesController : ", err);
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error" });
  }
};

module.exports = getMessagesController;
