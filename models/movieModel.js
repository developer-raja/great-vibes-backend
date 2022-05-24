const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    movie: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    cast: {
      type: [String],
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Movie', movieSchema)