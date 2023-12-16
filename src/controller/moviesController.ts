import { Request, Response } from "express";
import { moviesModel } from "../models";
import { CustomError } from "../helpers";

const getAllMovies = async (req: Request, res: Response) => {
  const data = await moviesModel.find({});
  return res.json({ success: true, data: data });
}

const searchMovies = async (req: Request, res: Response) => {
  const q = req.query.q;
  let query = {};

  if (q) {
    query = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { genre: { $regex: q, $options: 'i' } }
      ]
    }
  }

  const data = await moviesModel.find(query);
  return res.json({ success: true, data: data });
}

const validate = async (input: { [x: string]: any; }, rules: { [x: string]: any; }) => {
  const keys = Object.keys(rules);
  for (const key of keys) {
    const rule = rules[key];
    if (rule.required && !input[key]) return false;
    if (rule.type && input[key] instanceof rule.type) return false;
  }
  return true;
}

const createMovie = async (req: Request, res: Response) => {
  const payload = req.body;
  const isValid = validate(payload, {
    title: { required: true, type: String },
    genre: { required: true, type: String },
    rating: { required: true, type: Number },
    streamingLink: { required: true, type: String },
  });
  if (!isValid) throw new CustomError(400, 'BAD_REQUEST');
  const data = await moviesModel.create(payload);
  return res.status(200).json({ success: true, data: data.toJSON() });
};

const updateMovie = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  if (!payload.title && !payload.genre && !payload.rating && !payload.streamingLink) {
    throw new CustomError(400, 'BAD_REQUEST');
  }

  const data = await moviesModel.findByIdAndUpdate(id, payload, { new: true });
  return res.json({ success: true, data: data });
};

const deleteMovie = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await moviesModel.findByIdAndDelete(id);
  let result;
  if (!data) { result = { success: false, data: [] } } else {
    result = { success: true, data: data }
  }

  return res.json(result);
}


export { getAllMovies, searchMovies, createMovie, updateMovie, deleteMovie };