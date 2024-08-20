import { getmodel } from "../models/Anime.js";
import { Categories, getModel, Themes } from "../models/Categories.js";
import { Remove } from "../function/index.js";
import { storage } from "../config/firebase.js";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import mongoose from "mongoose";
import { json } from "express";
export const Fetchdata = async (req, res) => {
  try {
    const { page, type, sort, ...query } = req.query;
    const model = getmodel(type);
    const Catemodel = getModel("Categories", type);
    const Thememodel = getModel("Themes", type);
    const Sort =
      (sort == "atoz" && "Title") ||
      (sort == "reward" && "Rating") ||
      (sort == "eye" && "Episodes[0].Views") ||
      (sort == "heart" && "Episodes[0].Likes");

    for (let key in query) {
      if (query[key] === "") {
        delete query[key];
      }
    }
    if (query.Categories) {
      const categories = await Catemodel.find(
        { Name: query.Categories },
        { _id: 1 }
      );
      query.Categories = { $in: categories };
    }

    if (query.Themes) {
      const themes = await Thememodel.find({ Name: query.Themes });
      query.Themes = { $in: themes };
    }
    const filter = { $and: [{ ...query }] };

    const data = await model
      .find(filter, Remove)

      .sort({ [Sort]: 1 })
      .skip((page - 1) * 8)
      .limit(8);
    const length = await model.find(filter, { _id: 1 });

    if (data) {
      return res.json({ data, length: length.length });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
};
export const Upload = async (req, res, next) => {
  try {
    const { type } = req.query;
    const body = JSON.parse(req.body.body);
    const files = req.files;
    await Promise.all(
      files?.map(async (file) => {
        const Arr = file.originalname.split(".");
        const url = ref(
          storage,
          `Poster/${type}/${body.Title}-${Arr[0]}.${Arr[1]}`
        );
        await uploadBytes(url, file.buffer);
        const URL = await getDownloadURL(url);
        if (Number(Arr[0])) {
          body.Episodes[Arr[0] - 1].Poster = URL;
        } else {
          body.Poster = URL;
        }
      })
    );
    req.body = body;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const Create = async (req, res) => {
  try {
    const { type, id } = req.query;
    const body = req.body;

    const model = getmodel(type);
    if (id != "undefined") {
      const update = await model.findByIdAndUpdate(id, body);
      res.json({ update, status: 200 });
    } else {
      const newAnime = new model(body);
      const savedAnime = await newAnime.save();

      res.json({ savedAnime, status: 200 });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const CreateTags = async (req, res) => {
  try {
    const { tags } = req.params;
    const { type } = req.query;
    const { Name } = req.body;
    const model = getModel(tags, type);
    const Tags = new model({
      Name,
    });
    const info = await Tags.save();
    res.json({ info, status: 200 });
  } catch (error) {
    console.log(error);
    res.json({ message: "Category added Failed", status: 400 });
  }
};
