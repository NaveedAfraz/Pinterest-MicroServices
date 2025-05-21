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
    // this mediaid is the the photo id which i have to use to fetch the image from modeldb of the photo ...based on the mediaurl id i need to fetch the photo URL form the Photodb and show in ui of react
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
