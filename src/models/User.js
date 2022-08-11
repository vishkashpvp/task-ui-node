require("dotenv").config();

const { Schema, model } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function (next) {
  let { password } = this;
  this.password = await bcrypt.hash(
    password,
    parseInt(process.env.BCRYPT_ROUNDS)
  );
  next();
});

const User = model("User", userSchema);

module.exports = User;
