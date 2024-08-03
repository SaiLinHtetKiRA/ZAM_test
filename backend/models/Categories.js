import mongoose from "mongoose";
import { Schema } from "mongoose";

const newSchema = new Schema(
  {
    Name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

const Categories =
  mongoose.models.Categories || mongoose.model("Categories", newSchema);

export default Categories;
