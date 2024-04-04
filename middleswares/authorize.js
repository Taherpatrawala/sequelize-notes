const Jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(400);

    return next(
      new Error("Authorization header must be provided and start with Bearer")
    );
  }
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    res.status(401);
    return next(new Error("Authorization token must be provided"));
  }

  try {
    const decodedUser = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;
    next();
  } catch {
    res.status(401);
    next(new Error("Invalid or expired authentication token"));
  }
};

module.exports = authorize;
