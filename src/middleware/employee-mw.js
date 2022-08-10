/**
 * @summary validates if `user_id` exists in query.
 * @throws { object } error
 * @param req
 * @param res
 * @param next
 */
function validateEmployeesQueryGET(req, res, next) {
  try {
    if (!req.query.user_id) {
      throw new Error("User Id is mandatory");
    }
    if (req.query.user_id.length !== 24) {
      throw new Error("Please Provide Full User Id");
    }
    next();
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}

module.exports = {
  validateEmployeesQueryGET,
};
