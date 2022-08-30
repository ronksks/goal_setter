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
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //checks if user found and if he's password is currect
  if (user && (await bctypy.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),

    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }

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
  //check if user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exsits");
  }
  //Hash password
  const salt = await bctypy.genSalt(10);
  const hashPassword = await bctypy.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// // @desc    Get user data
// // @route   GET /api/me
// // @access  Public

const getMe = asyncHandler(async (req, res) => {
  res.json({ massage: "User data display" });
});

// Generate JWT token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  loginUser,
  registerUser,
  getMe,
};
