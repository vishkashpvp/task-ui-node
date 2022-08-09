const { Schema, model } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is mandatory"],
      minlength: [3, "Name must be at least 3 characters"],
      trim: true,
    },
    mail: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Mail is mandatory"],
      trim: true,
      validate: [isEmail, "Invalid Mail Format"],
    },
    password: {
      type: String,
      required: [true, "Password is mandatory"],
      minlength: [5, "Password must be at least 5 characters"],
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
