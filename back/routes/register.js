import express from "express";
import User from "../models/user.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post(
  "/",
  body("firstname", "Firstname must contain only alphabetic").isAlpha("en-US", {
    ignore: " ",
  }),
  body("lastname", "Lastname must contain only alphabetic").isAlpha(),
  body("phone", "Phone must contain only number").isNumeric(),
  body("email", "please enter a valid Email").isEmail(),
  body("password", "Password must contain minimum 5 characters").isLength({
    min: 5,
  }),
  body(
    "role",
    "Role Must Be One Of These Values : Manager, Cashier or Stock Manager"
  )
    .not()
    .equals("null"),
  body("gender", "Gender Must Be One Of These Values : Male or Female")
    .not()
    .equals("null"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.find({ email: req.body.email }).then((users) => {
      if (users.length) {
        return res
          .status(400)
          .send({ errors: [{ msg: "User already exist!" }] });
      }
      let newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
          if (err) {
            throw err;
          }
          newUser.password = hashedPwd;
          newUser.save();
          let payload = { userId: newUser._id };
          console.log({ payload })
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            console.log({ token, err })
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        });
      });
    });
  }
);

export { router as register };
