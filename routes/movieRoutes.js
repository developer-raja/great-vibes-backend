const express = require('express')
const router = express.Router()
const {
    getMovies,
    createMovie,
    getMovie,
    deleteMovie,
    updateMovie,
  } = require('../controllers/movieController')

  router.get('/',getMovies);
  router.post('/',createMovie);
  router.get('/:id',getMovie);
  router.put('/:id',updateMovie);
  router.delete('/:id',deleteMovie)

module.exports = router;