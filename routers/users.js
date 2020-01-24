const express = require("express");
const User = require("../models/User");
const router = new express.Router();
const { registerValidation, loginValidator } = require("../utils/validations");

router.post("/register", async (req, res) => {
  try {
    const { error } = registerValidation(req.body);

    if (error) {
      res.status(400).send({
        message: error.details[0].message
      });
    }

    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).send({
        message: "Email already exists"
      });
    }

    const user = await new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      email: req.body.email
    });

    user.save();

    res.status(200).send({
      user,
      message: "User created successfully"
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidator(req.body);

    if (error) {
      res.status(400).send({
        error: error.details[0].message
      });
    }

    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateToken();

    res.status(200).send({
      user
    });
  } catch (error) {
    res.status(500).send({
      error
    });
  }
});

module.exports = router;
