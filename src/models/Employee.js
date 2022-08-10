const { Schema, model } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const User = require("./User");

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
    user_id: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
      index: true,
    },
  },
  {
    collection: "Employees",
  }
);

employeeSchema.pre("save", async function (next) {
  const user = await User.findById(this.user_id);
  if (!user) {
    return next(new Error("Invalid User"));
  }
  next();
});

const Employee = model("Employee", employeeSchema);

module.exports = Employee;
