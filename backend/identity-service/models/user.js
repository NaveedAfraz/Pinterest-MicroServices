const mongooese = require("mongoose");
const argon2 = require("argon2");

const userScheme = new mongooese.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
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
  if (this.isModified("password")) {
    try {
      this.password = await argon2.hash(this.password);
    } catch (error) {
      next(error);
    }
  }
  next();
});

userScheme.methods.comparePassword = async function (password) {
  try {
    return await argon2.verify(this.password, password);
  } catch (error) {
    throw error;
  }
};

userScheme.index({ username: "text" });

const User = mongooese.model("User", userScheme);
module.exports = User;