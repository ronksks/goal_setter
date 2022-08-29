const jwt = require("jsonwebtoken");
const bctypy = require("bcryptjs");
// asyncHandler(express-async-handler) is a
// simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Authenticate user
// @route   POST /api/login
// @access  public
// const getUserInfo = asyncHandler(async (req, res) => {
//   const users = await User.find();

//   res.status(200).json(users);
// });

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     res.status(400);
//     throw new Error("User not found");
//   }
//   console.log(user.name + user.password);
//   //   const foundUserPassword = await User.findByIdAndUpdate(
//   //     req.params.id,
//   //     req.body.password
//   //   );
//   //   if (req.body.password === foundUserPassword.password) {
//   //     res.status(200).json("Passwrod currect");
//   //   }
// });

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   switch (req.body) {
  //     case !req.body.name:
  //       {
  //         res.status(400);
  //         // uses the new error handler
  //         throw new Error("Please type a username");
  //       }
  //       break;
  //     case !req.body.password:
  //       {
  //         res.status(400);
  //         // uses the new error handler
  //         throw new Error("Please type a password");
  //       }
  //       brake;
  //     case !req.body.email:
  //       {
  //         res.status(400);
  //         // uses the new error handler
  //         throw new Error("Please type an email");
  //       }
  //       brake;
  //   }
  const user = await User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });

  res.status(200).json('Register User');
});

// // @desc    Get user data
// // @route   GET /api/me
// // @access  Private

const getMe = asyncHandler(async (req, res) => {
  res.json({ massage: "User data display" });
});

module.exports = {
  loginUser,
  registerUser,
  getMe,
};
