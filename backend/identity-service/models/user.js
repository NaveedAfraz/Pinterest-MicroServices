const mongooese = require("mongoose");
const argon2 = require("argon2");

const userScheme = new mongooese.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
// i am hashing the passord here instead of controller
userScheme.pre("save", async function (next) {
  if (this.isModified("Password")) {
    try {
      this.Password = await argon2.hash(this.Password);
    } catch (error) {
      next(error);
    }
  }
  next();
});

userScheme.methods.comparePassword = async function (password) {
  try {
    return await argon2.verify(this.Password, password);
  } catch (error) {
    throw error;
  }
};

const User = mongooese.model("User", userScheme);
module.exports = User;
