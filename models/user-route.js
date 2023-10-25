const { Schema, model } = require("mongoose");

//Schema to create user model

const userScehma = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userScehma.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userScehma);

module.exports = User;
