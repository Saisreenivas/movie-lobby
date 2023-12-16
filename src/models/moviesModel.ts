import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  title: { type: String },
  genre: { type: String },
  rating: { type: Number },
  streamingLink: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

const moviesModel = mongoose.model("movies", moviesSchema, "movies");

export default moviesModel;