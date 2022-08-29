const mongoose = require("mongoose");

// for every goal we need to know which user has this goal
const goalSchema = mongoose.Schema(
  {
    user: {
        //this is the _id that the object would hold
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a test value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
