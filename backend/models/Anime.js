import mongoose from "mongoose";
import { Schema } from "mongoose";

const episodeSchema = new Schema({
  Ep: { type: String, require: true },
  Download: { type: String, require: true },
  Video: { type: String, require: true },
});
const animeSchema = new Schema(
  {
    Title: { type: String, require: true },
    Poster: { type: String, require: true },
    Review: { type: String, require: true },
    Year: { type: Number, require: true },
    Rating: { type: Number, require: true },
    Link: { type: String, require: false },
    Categories: [{ type: mongoose.Types.ObjectId, ref: "Categories" }],
    Views: { type: Number, require: true, default: 0 },
    Likes: { type: Number, require: true, default: 0 },
    Episodes: [episodeSchema],
  },
  { timestamps: true }
);

const Anime = mongoose.models.Anime || mongoose.model("Anime", animeSchema);
export default Anime;
