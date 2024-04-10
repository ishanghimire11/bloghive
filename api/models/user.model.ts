import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://avatarairlines.com/wp-content/uploads/2020/05/Female-Placeholder.png",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
