import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, require: true, default: "user" },
    profile: { type: String, require: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
