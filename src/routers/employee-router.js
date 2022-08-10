const express = require("express");

const router = new express.Router();

const { registerEmployee, userAllEmployees } = require("../db/mongo");
const { validateEmployeesQueryGET } = require("../middleware/employee-mw");

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

router.get("/employees", validateEmployeesQueryGET, async (req, res) => {
  try {
    const employees = await userAllEmployees({ user_id: req.query.user_id });
    res.send(employees);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
