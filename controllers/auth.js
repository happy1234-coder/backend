const User = require("../models/UserModel");
const { sendEmail } = require("../utils/sendEmail");

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    const newUser = await User.create({
      Firstname: firstName,
      Lastname: lastName,
      Email: email,
      Password: password,
      Phonenumber: phoneNumber,
    });

    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(500).json({
      success: false,
      error: "Please provide email and Password",
    });
  }

  try {
    const user = await User.findOne({ Email: email }).select("+password");

    if (!user) {
      res.status(404).json({ success: false, error: "Invalid EmailId" });
    }

    const PasswordMatch = user.isMatched(password);

    if (!PasswordMatch) {
      res.status(400).json({ success: false, error: "Invalid Password" });
    }

    sendToken(user, 200, res);
    //
  } catch (error) {
    res.send(500).json({ success: false, error: error.message });
  }

  res.send("login Route");
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Email could no be sent",
      });
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetURL = `http://localhost:5000/passwordreset/${resetToken}`;

    const message = `
    <h1> You have requested for a reset </h1>
    <p>Please go to the link</p>
    <a href=${resetURL} clicktracking=off>${resetURL}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      });

      res.status(200).json({
        success: true,
        data: "Email sent",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(500).json({
        success: false,
        error: "Email Couldn't be send",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .creatHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid Reset Token",
      });
    }

    user.Password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "password Reset Success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.messge,
    });
  }
};

// generates JWT Token
const sendToken = (user, status, res) => {
  const token = user.getSignedToken().select("-password");

  res.status(status).json({
    success: true,
    token,
    user,
  });
};
