import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

import authorized from '../helpers/authmiddleware.js';
import user from '../models/user.js';

dotenv.config();

export const router = express.Router();

router.get('/', authorized, (req, res) => {
  user
    .findById(req.userId)
    .select('-passwoerd')
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: 'User not found!' });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: 'Server error' });
    });
});

router.post(
  '/',
  body('email', 'Please enter a valid Email!').isEmail(),
  body('password', 'Password must contain minimum 5 characters!').notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    user.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Please register before!' }] });
      }
      if (
        req.body.email === process.env.ADMIN_ONE ||
        req.body.email === process.env.ADMIN_TWO
      ) {
        if (req.body.password === user.password) {
          return res.send({ msg: 'Welcome Admin!', role: user.role });
        }
      }
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        } else if (!isMatch) {
          return res.status(400).json({ errors: [{ msg: 'Wrong password!' }] });
        } else {
          let payload = { userId: user._id, role: user.role };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        }
      });
    });
  }
);

export { router as login }