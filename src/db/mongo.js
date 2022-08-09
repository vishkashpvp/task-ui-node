require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");

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

module.exports = {
  signupUser,
};
