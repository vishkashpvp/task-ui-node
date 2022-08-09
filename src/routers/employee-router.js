const express = require("express");

const router = new express.Router();

const { registerEmployee } = require("../db/mongo");

router.get("/employees", (req, res) => {
  res.status(404).send({
    message: "Service is currently under progress",
  });
});

/**
 * @api {post} /employee/add Register a new employee
 * @apiGroup Employees
 * @apiSuccess { object } employee
 * @apiError { object } error
 */
router.post("/employee/add", async (req, res) => {
  try {
    const emp = await registerEmployee(req.body);
    res.status(201).send(emp);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
