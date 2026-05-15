const cloudinary = require("../../lib/cloudinary");
const Message = require("../../models/messageSchema");

const sendMessageController = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // upload image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = (await uploadResponse).secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // todo : socket io functionalityy

    return res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessageController : ", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = sendMessageController;
