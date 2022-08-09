const express = require("express");

const router = new express.Router();

const { signupUser } = require("../db/mongo");

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
router.post("/user/signup", async (req, res) => {
  try {
    const created_user = await signupUser(req.body);
    res.status(201).send(created_user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
