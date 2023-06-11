const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieJoi,
  deleteMovieJoi,
} = require('../middlewares/celebrate');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieJoi, createMovie);
movieRouter.delete('/:_id', deleteMovieJoi, deleteMovie);

module.exports = movieRouter;