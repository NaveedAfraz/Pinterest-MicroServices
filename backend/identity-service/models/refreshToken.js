const mongoose = require("mongoose");

const refreshTokenScheme = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

refreshTokenScheme.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const RefreshToken = mongoose.model("RefreshToken", refreshTokenScheme);
module.exports = RefreshToken;
