import { getmodel } from "../models/Anime.js";
import { Categories, getModel, Themes } from "../models/Categories.js";
import mongoose from "mongoose";

export const Remove = {
  createdAt: 0,
  updatedAt: 0,
};
export const CRemove = {
  _id: 0,
};
export const fetchData = async (type) => {
  const model = getmodel(type);
  const data = await model.find({});
  return data;
};

export const fetchByID = async (id, Type) => {
  const model = getmodel(Type);
  const data = await model
    .findById(id, Remove)
    .populate(["Categories", "Themes"]);

  return data;
};
export const RandomAnimes = async (type, id) => {
  // const data = await Anime.aggregate([
  //   { $sample: { size: 6 } },
  //   { $lookup: { from: "categories", localField: "Categories", foreignField: "_id", as: "Categories" } },
  //   { $unwind: "$Categories" },
  //   { $project: { Title: 1, Poster: 1, Categories: 1 } },
  // ]);
  const model = getmodel(type);
  if (id) {
    const data = await model.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(id) } } },
      { $sample: { size: 10 } },
    ]);
    return NextResponse.json({ data });
  }
  const data = await model.aggregate([{ $sample: { size: 10 } }]);
  return data;
};

export const NewestAnime = async (type) => {
  const model = getmodel(type);
  const data = await model.find({}, Remove).sort({ createdAt: -1 }).limit(10);
  return data;
};
export const PopularAnime = async (type) => {
  const model = getmodel(type);
  const data = await model
    .find({}, Remove)
    .sort({ Likes: 1 })

    .limit(10);
  return data;
};
export const getCategories = async (type) => {
  const model = getModel("Categories", type);
  const data = await model.find({});
  return data;
};
export const getThemes = async (type) => {
  const model = getModel("Themes", type);

  const data = await model.find({}).sort({ Name: 1 });
  return data;
};
export const getYears = async (type) => {
  const model = getmodel(type);
  const data = await model.find({}, { Year: 1 }).sort({ Year: 1 });
  return data;
};
export const getStudios = async (type) => {
  const model = getmodel(type);
  const data = await model.find({}, { Studio: 1 }).sort({ Studio: 1 });
  return data;
};
