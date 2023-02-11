import dotenv from "dotenv"

dotenv.config();

const rolesArray = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Session expired",
      code: "SESSION_EXPIRED",
    });
  }
  const authorized = false;
  rolesArray.forEach((role) => {
    authorized = req.user.role === role;
  });
  if (authorized) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
};

export { rolesArray as permitted }