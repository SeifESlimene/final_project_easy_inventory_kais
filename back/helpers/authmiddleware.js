import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export default (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msg: "you are not authorized" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      throw err;
    }
    req.userId = payload.userId;
    next();
  });
};
