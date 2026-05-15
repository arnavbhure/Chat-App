const User = require("../../models/userSchema");

const getUsersForSidebarController = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in getUsersForSidebarController : ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getUsersForSidebarController;
