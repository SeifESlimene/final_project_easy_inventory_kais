import express from "express";
import User from "../models/user.js";
import authMiddleware from "../helpers/authmiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  User.find()
    .then((per) => res.status(200).json(per))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

export { router as dashboard }