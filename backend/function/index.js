import Anime from "../models/Anime.js";
import Categories from "../models/Categories.js";

export const fetchData = async () => {
  const data = await Anime.find({}, { createdAt: 0, updatedAt: 0 });

  return data;
};
export const fetchByID = async (id) => {
  const data = await Anime.findById(id, {
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
    "Episodes._id": 0,
  }).populate("Categories", {
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });
  return data;
};
export const RandomAnimes = async (id) => {
  // const data = await Anime.aggregate([
  //   { $sample: { size: 6 } },
  //   { $lookup: { from: "categories", localField: "Categories", foreignField: "_id", as: "Categories" } },
  //   { $unwind: "$Categories" },
  //   { $project: { Title: 1, Poster: 1, Categories: 1 } },
  // ]);
  if (id) {
    const data = await Anime.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(id) } } },
      { $sample: { size: 10 } },
    ]);
    return NextResponse.json({ data });
  }
  const data = await Anime.aggregate([{ $sample: { size: 10 } }]);
  return data;
};

export const NewestAnime = async () => {
  const data = await Anime.find({}).sort({ createdAt: -1 }).limit(10);
  return data;
};
export const PopularAnime = async () => {
  const data = await Anime.find({}).sort({ Likes: 1 }).limit(10);
  return data;
};
