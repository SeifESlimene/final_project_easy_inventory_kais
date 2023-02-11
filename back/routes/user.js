import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/loadpersonnel/:id", (req, res) => {
    const id = req.params._id;
    User.findById(id)
      .then((pers) => {
        res.status(200).json(pers);
      })
      .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
  });

router.get('/allUsers', (req, res) => {
  User.find()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

router.put('/updateUser/:id',  (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, phone, email, password, role } = req.body;
  User.findByIdAndUpdate(
    id,
    { firstname, lastname, phone, email, password, role },
    { useFindAndModify: false },
    (err, data) => {
      if (err) {
        res.status(400).json({ errors: [{ msg: err }] });
      }
      User.findById(id)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
    }
  );
});

router.delete('/deleteUser/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

export { router as user }