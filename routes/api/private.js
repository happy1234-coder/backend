const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/auth");

router.route("/privateroute").get(protect, (req, res) => {
  res.status(200).json({
    sucess: true,
    errror: "Info from private route",
  });
});

module.exports = router;
