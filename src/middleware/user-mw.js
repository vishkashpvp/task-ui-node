function validateSignUpDetails(req, res, next) {
  try {
    if (!req.body.password) {
      throw new Error("Password is mandatory");
    }
    if (req.body.password.length < 5) {
      throw new Error("Password must be at least 5 characters");
    }
    next();
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

function validateLogin(req, res, next) {
  try {
    if (!req.body.mail) {
      throw new Error("Provide Mail ");
    }
    if (!req.body.password) {
      throw new Error("Provide Password ");
    }
    next();
  } catch (error) {
    res
      .status(400)
      .send({ warning: "Mandatory Fields Missing", error: error.message });
  }
}

module.exports = {
  validateSignUpDetails,
  validateLogin,
};
