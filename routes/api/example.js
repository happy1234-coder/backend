const express = require("express");
const router = express.Router();
const Userdemo = require("../../models/user");

router.route("/getUsers").get(async (req, res) => {
  try {
    const userdetails = await Userdemo.find({});
    res.status(200).json({
      success: true,
      message: "Userdetails obtained",
      data: userdetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
});

router.route("/getSingleUser/").get(async (req, res) => {
  const _id = req.query.id;
  console.log(_id);
  try {
    const userdetails = await Userdemo.find({ _id });
    res.status(200).json({
      success: true,
      message: "Userdetails obtained",
      data: userdetails,
    });
  } catch (error) {
    console.log("error");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.route("/createUser").post(async (req, res) => {
  const { first, last, email } = req.body;

  console.log(req.body, first, last, email);

  try {
    const userdetails = await Userdemo.create({
      Firstname: first,
      Lastname: last,
      Email: email,
    });

    res.status(201).json({
      success: true,
      message: "User Created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
    console.log(error);
  }
});

router.route("/updateUser").put(async (req, res) => {
  const { _id, first, last, email } = req.body;

  console.log(req.body, first, last, email);

  try {
    const userdetails = await Userdemo.findByIdAndUpdate(
      { _id },
      {
        Firstname: first,
        Lastname: last,
        Email: email,
      }
    );

    res.status(201).json({
      success: true,
      message: "User Updated",
      userdata: userdetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
    console.log(error);
  }
});

router.route("/deleteUser/").delete((req, res) => {
  const _id = req.query.id;
  console.log(_id);

  try {
    Userdemo.findByIdAndDelete(_id).then((user) => {
      console.log(user);
      if (!user) {
        res.status(400).json({ success: false, message: "Invalid Id" });
      } else {
        res.status(200).json({ success: true, userdata: user });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
