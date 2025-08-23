const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserAuthorization = (req, res, next) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    res.status(400).json({
      success: false,
      message: "did not Provide authorization headers code",
    });
  }

  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    res.status(400).json({
      success: false,
      message: "token not provided so please login again",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    console.log(decode);

    req.userInfo = decode;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token, please login again",
    });
  }
};

module.exports = UserAuthorization