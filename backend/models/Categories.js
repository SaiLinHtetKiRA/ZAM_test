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
  { timestamps: false, versionKey: false }
);

export const Categories =
  mongoose.connection.useDb("Anime").models.Categories ||
  mongoose.connection.useDb("Anime").model("Categories", newSchema);
export const Themes =
  mongoose.connection.useDb("Anime").models.Themes ||
  mongoose.connection.useDb("Anime").model("Themes", newSchema);

export const HCategories =
  mongoose.connection.useDb("Hentai").models.Categories ||
  mongoose.connection.useDb("Hentai").model("Categories", newSchema);
export const HTheme =
  mongoose.connection.useDb("Hentai").models.Themes ||
  mongoose.connection.useDb("Hentai").model("Themes", newSchema);
export const getModel = (modelName, db) => {
  return (
    mongoose.connection.useDb(db).models[modelName] ||
    mongoose.connection.useDb(db).model(modelName, newSchema)
  );
};
