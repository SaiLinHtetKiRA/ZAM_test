import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Categories, Themes, HCategories, HTheme } from "./Categories.js";
const episodeSchema = new Schema(
  {
    Ep: { type: String, require: true },
    Poster: { type: String, require: false },
    Code: { type: String, require: true },
    Tg: { type: String, require: false },
    Views: { type: Number, require: true, default: 0 },
    Likes: { type: Number, require: true, default: 0 },
  },
  { _id: false, timestamps: false, versionKey: false, id: false }
);
const newSchema = new Schema(
  {
    Title: { type: String, require: true },
    Poster: { type: String, require: true },
    Review: { type: String, require: true },
    Year: { type: String, require: true },
    Complete: { type: Boolean, require: true },
    Studio: { type: String, require: true },
    Rating: { type: String, require: true },
    Categories: [{ type: mongoose.Types.ObjectId, ref: Categories }],
    Themes: [{ type: mongoose.Types.ObjectId, ref: Themes }],
    Episodes: [episodeSchema],
  },
  { timestamps: true, versionKey: false }
);
const newHSchema = new Schema(
  {
    Title: { type: String, require: true },
    Poster: { type: String, require: true },
    Review: { type: String, require: true },
    Year: { type: String, require: true },
    Complete: { type: Boolean, require: true },
    Studio: { type: String, require: true },
    Rating: { type: String, require: true },
    Categories: [{ type: mongoose.Types.ObjectId, ref: HCategories }],
    Themes: [{ type: mongoose.Types.ObjectId, ref: HTheme }],
    Episodes: [episodeSchema],
  },
  { timestamps: true, versionKey: false }
);
export const getmodel = (type) => {
  return (
    mongoose.connection.useDb(type).models[type + "s"] ||
    mongoose.connection
      .useDb(type)
      .model(type + "s", type == "Anime" ? newSchema : newHSchema)
  );
};
