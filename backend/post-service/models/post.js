const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mediaUrls: {
      type: [String],
     // required: true,
    },
    tags: {
      type: [String],
     // required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// postSchema.index({ title: "text", description: "text" });
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
