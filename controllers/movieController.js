const express = require("express");
const cookieParser = require("cookie-parser");
const Movie = require("../models/movieModel");

const app = express();
app.use(cookieParser());

function validateCookie(req, res, next) {
  const { cookies } = req;
  if ("session_id" in cookies) {
    if (cookies.session_id === "123456") next();
    else res.status(403).json({ msg: "Not Authenticated" });
  } else res.status(403).json({ msg: "Not Authenticated" });
}

const getMovies =
  ("/",
  async (req, res) => {
    try {
      const movies = await Movie.find();

      res.status(200).json(movies);
    } catch (err) {
      console.log(err);
    }
  });

const getMovie =
  ("/:id",
  async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      console.log(err);
    }
  });

const createMovie =
  ("/",
  async (req, res) => {
    const movie = new Movie({
      movie: req.body.movie,
      rating: req.body.rating,
      cast: req.body.cast,
      genre: req.body.genre,
    });

    try {
      const savedMovie = await movie.save();
      res.cookie("session_id", "123456");
      res.status(200).json(savedMovie);
    } catch (err) {
      console.log(err);
    }
  });

const deleteMovie =
  ("/:id",
  validateCookie,
  async (req, res) => {
    try {
      const removedMovie = await Movie.remove({ _id: req.params.id });
      res.cookie("session_id", "123456");
      res.status(200).json(removedMovie);
    } catch (err) {
      console.log(err);
    }
  });

const updateMovie =
  ("/:id",
  validateCookie,
  async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
