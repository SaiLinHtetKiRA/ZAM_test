import Anime from "../models/Anime.js";

export const Fetchdata = async (req, res) => {
  try {
    const data = await Anime.find({});

    if (data) {
      return res.json(data);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
};
