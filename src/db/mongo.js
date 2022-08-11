require("dotenv").config();

const mongoose = require("mongoose");
const Employee = require("../models/Employee");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const atlasURI = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_ENDPOINT}/${process.env.ATLAS_DB_EMS}?retryWrites=true&w=majority`;

mongoose.connect(atlasURI, {
  useNewUrlParser: true,
});

/**
 * @summary Creates user in the database.
 * @returns { User } user
 * @throws { object } error
 * @param { object } data
 */
async function signupUser(data) {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw { error: error.message };
  }
}

/**
 * @summary gets user from the database.
 * @returns { User } user
 * @throws { object } error
 * @param { object } data
 */
async function signinUser(data) {
  try {
    const user = await User.findOne({ mail: data.mail });

    if (!user) {
      throw new Error(`User doesn't exist with given mail ${data.mail}`);
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login. Please check credentials provided");
    }

    return user;
  } catch (error) {
    throw { error: error.message };
  }
}

/**
 * @summary Creates employee in the database.
 * @returns { Employee } employee
 * @throws { object } error
 * @param { object } data
 */
async function registerEmployee(data) {
  try {
    const employee = await Employee.create(data);
    return employee;
  } catch (error) {
    throw { error: error.message };
  }
}

/**
 * @summary Gets all employees from the db of the user.
 * @returns { [Employee] } employees
 * @throws { object } error
 * @param { object } data
 */
async function userAllEmployees(data) {
  try {
    const employees = await Employee.find({
      user_id: data.user_id,
    });
    return employees;
  } catch (error) {
    throw { error: error.message };
  }
}

module.exports = {
  signupUser,
  signinUser,
  registerEmployee,
  userAllEmployees,
};
