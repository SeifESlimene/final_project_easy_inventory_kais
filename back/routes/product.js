import express from 'express';
import authMiddleware from "../helpers/authmiddleware.js";
import Post from "../models/post.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/", authMiddleware, (req, res) => {
  let newPost = new Post({ ...req.body, owner: req.userId });
  newPost
    .save()
    .then((Post) => res.status(201).send(Post))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "sever error" });
    });
});

router.get("/", authMiddleware, (req, res) => {
  Post.find()
    .then((posts) => res.send(posts))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "server error" });
    });
});

router.get("/myposot", authMiddleware, (req, res) => {
  User.find({ owner: req.userId })
    .then((posts) => res.send(posts))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "server error" });
    });
});

export { router as product }
