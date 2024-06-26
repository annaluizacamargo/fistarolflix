import { Repository } from "typeorm";
import { Movie } from "../entity/Movie";
import { AppDataSource } from "../data-source";
import { IMovie } from "../dto/IMovie";

/**
 * Class that represents the repository of the movie entity
 * @class
 * @property {Repository<Movie>} repository - Repository of movie entity
 * @method createAndSave - Method to create and save a movie
 * @method findMovies - Method to find the movies with pagination
 * @method findById - Method to find a movie by id
 * @method updateMovie - Method to update a movie
 * @method enableOrDisableMovie - Method to enable or disable a movie
 */
class MovieRepository {
  private repository: Repository<Movie> =
    AppDataSource.manager.getRepository(Movie);

  async createAndSave(movie: Movie) {
    return await this.repository.save(movie);
  }

  async findMovies(pageNumber: number, pageSize: number) {
    return await this.repository
      .createQueryBuilder("movie")
      .orderBy("movie.year", "DESC")
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getMany();
  }

  async findById(movieCode: IMovie["movieCode"]) {
    return this.repository.findOne({ where: { movieCode } });
  }

  async updateMovie({
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
  }: {
    id: IMovie["id"];
    movieCode: IMovie["movieCode"];
    title: IMovie["title"];
    genres: IMovie["genres"];
    duration: IMovie["duration"];
    year: IMovie["year"];
    trailerUrl: IMovie["trailerUrl"];
    synopsis: IMovie["synopsis"];
    posterUrl: IMovie["posterUrl"];
    ageRating: IMovie["ageRating"];
  }) {
    return this.repository.update(id, {
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
  }

  async enableOrDisableMovie(id: number, isActive: boolean) {
    return this.repository.update(id, { isActive: isActive });
  }
}

export default MovieRepository;
