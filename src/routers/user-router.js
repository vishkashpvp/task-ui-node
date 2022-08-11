const express = require("express");

const router = new express.Router();

const { signupUser, signinUser } = require("../db/mongo");
const {
  validateSignUpDetails,
  validateLogin,
} = require("../middleware/user-mw");

router.get("/users", (req, res) => {
  res.status(404).send({
    message: "Service is currently under progress",
  });
});

/**
 * @api {post} /user/signup Register a new user
 * @apiGroup Users
 * @apiSuccess { object } user
 * @apiError { object } error
 */
router.post("/user/signup", validateSignUpDetails, async (req, res) => {
  try {
    const created_user = await signupUser(req.body);
    res.status(201).send(created_user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @api {post} /user/signin Login existing user
 * @apiGroup Users
 * @apiSuccess { object } user
 * @apiError { object } error
 */
router.post("/user/signin", validateLogin, async (req, res) => {
  try {
    const user = await signinUser(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
