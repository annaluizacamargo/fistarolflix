import { Request, Response } from "express";
import { Movie } from "../entity/Movie";
import MovieRepository from "../repository/MovieRepository";

/**
 * Class that represents the movie controller
 * @class
 * @method create - Method to create a movie
 * @method get - Method to get all movies
 * @method getByMovieCode - Method to get a movie by movie code
 * @method update - Method to update a movie
 * @method patch - Method to enable or disable a movie
 */
class MovieController {
  async create(request: Request, response: Response) {
    const {
      movieCode,
      title,
      genres,
      duration,
      year,
      trailerUrl,
      synopsis,
      posterUrl,
      ageRating,
    } = request.body;
    const movie = new Movie(
      movieCode,
      title,
      genres,
      duration,
      year,
      trailerUrl,
      synopsis,
      posterUrl,
      ageRating,
      true
    );
    const movieRepository = new MovieRepository();
    const movieAlreadyCreate = await movieRepository.findById(movieCode);

    if (movieAlreadyCreate) {
      return response.sendStatus(409);
    }

    const data = await movieRepository.createAndSave(movie);

    if (!data) {
      return response.sendStatus(400);
    }

    return response.status(201).json(data);
  }

  async get(request: Request, response: Response) {
    const pageNumber = parseInt(request.query.pageNumber as string) || 1;
    const pageSize = parseInt(request.query.pageSize as string) || 1;
    const movieRepository = new MovieRepository();
    const data = await movieRepository.findMovies(pageNumber, pageSize);
    return response.json(data);
  }

  async getByMovieCode(request: Request, response: Response) {
    const { code } = request.params;
    const movieCodeNumber = parseInt(code);

    if (isNaN(movieCodeNumber)) {
      return response.sendStatus(400);
    }

    const movieRepository = new MovieRepository();
    const data = await movieRepository.findById(movieCodeNumber);

    if (!data) {
      return response.sendStatus(404);
    }

    return response.json(data);
  }

  async update(request: Request, response: Response) {
    const {
      id,
      movieCode,
      title,
      genres,
      duration,
      year,
      trailerUrl,
      synopsis,
      posterUrl,
      ageRating,
    } = request.body;
    const idNumber = parseInt(id);
    const movieRepository = new MovieRepository();

    if (isNaN(idNumber)) {
      return response.sendStatus(400);
    }

    await movieRepository.updateMovie({
      id,
      movieCode,
      title,
      genres,
      duration,
      year,
      trailerUrl,
      synopsis,
      posterUrl,
      ageRating,
    });

    return response.sendStatus(200);
  }

  async patch(request: Request, response: Response) {
    const { id } = request.params;
    const { isActive } = request.body;
    const idNumber = parseInt(id);
    const movieRepository = new MovieRepository();

    if (isNaN(idNumber)) {
      return response.sendStatus(400);
    }

    await movieRepository.enableOrDisableMovie(idNumber, isActive);

    return response.sendStatus(200);
  }
}

export default MovieController;
