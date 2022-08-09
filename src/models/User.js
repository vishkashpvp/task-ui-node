const { Schema, model } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
      trim: true,
    },
    mail: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
      validate: [isEmail, "Invalid Mail Format"],
    },
    password: {
      type: String,
      minlength: 5,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    collection: "Users",
  }
);

const User = model("User", userSchema);

module.exports = User;
