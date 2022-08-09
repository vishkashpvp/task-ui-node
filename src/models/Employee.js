const { Schema, model } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const employeeSchema = new Schema(
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
    technology: {
      type: String,
      required: [true, "Technology is mandatory"],
      trim: true,
    },
    location: {
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
    collection: "Employees",
  }
);

const Employee = model("Employee", employeeSchema);

module.exports = Employee;
