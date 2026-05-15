const checkAuthController = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in checkAuthController:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = checkAuthController;
