import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IMovie } from "../dto/IMovie";

/**
 * Class that represents the movie entity
 * @class
 * @property {number} id - Movie id (primary key)
 * @property {number} movieCode - Movie code
 * @property {string} title - Movie title
 * @property {string} genres - Movie genres
 * @property {number} duration - Movie duration
 * @property {number} year - Movie year
 * @property {string} trailerUrl - Movie trailer url
 * @property {string} sinonpsis - Movie sinonpsis
 * @property {string} posterUrl - Movie poster url
 * @property {string} ageRating - Movie age rating
 */
@Entity()
export class Movie {
  constructor(
    movieCode: IMovie["movieCode"],
    title: IMovie["title"],
    genres: IMovie["genres"],
    duration: IMovie["duration"],
    year: IMovie["year"],
    trailerUrl: IMovie["trailerUrl"],
    sinonpsis: IMovie["sinonpsis"],
    posterUrl: IMovie["posterUrl"],
    ageRating: IMovie["ageRating"],
    isActive: IMovie["isActive"]
  ) {
    this.movieCode = movieCode;
    this.title = title;
    this.genres = genres;
    this.duration = duration;
    this.year = year;
    this.trailerUrl = trailerUrl;
    this.sinonpsis = sinonpsis;
    this.posterUrl = posterUrl;
    this.ageRating = ageRating;
    this.isActive = isActive;
  }

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  movieCode: number;

  @Column()
  title: string;

  @Column()
  genres: string;

  @Column()
  duration: number;

  @Column()
  year: number;

  @Column()
  trailerUrl: string;

  @Column()
  sinonpsis: string;

  @Column()
  posterUrl: string;

  @Column()
  ageRating: string;

  @Column({ default: true })
  isActive: boolean;
}
