const validation = require("../validation/index");
const jwt = require("jsonwebtoken");
const errorMessage = (value, res, next) => {
  //   console.log(value, "value");
  if (value.error) {
    return res.status(400).json({
      success: false,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

const validateUser = (req, res, next) => {
  const value = validation.validate(req.body);
  errorMessage(value, res, next);
};

const jwtVerify = (req, res, next) => {
  let token;
  if (req.headers["authorization"]) {
    token = req.headers["authorization"].split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.name = decoded.name;
    req.className = decoded.className;
    next();
  });
};

module.exports = { validateUser, jwtVerify };
