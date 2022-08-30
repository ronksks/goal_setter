// this middlware between the login|register and the server authentication is in charge of checking
// id the request header has a token to veify in the firstplace
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //in eatch header that bears a token we want to check if the header starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //  Get token from header : commes in array format: "Bearer token"
      //  we need to split the text
      //  (turn it to an array at the space and get the token from the secnd argument)
      token = req.headers.authorization.split(" ")[1];

      //  Verify token - it decodes the token with the secret and retrive the use id that has been set in the generate token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //  Find the user by the id id that inside the token without the hashed password
      req.user = await User.findById(decoded.id).select("-password");

      // continue to the next middlware
      next();
    } catch (error) {
      console.log(error);

      // 401 - Autherization required
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
