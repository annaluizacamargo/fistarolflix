export interface IMovie {
  id: number;
  movieCode?: number;
  title?: string;
  genres?: string;
  duration?: number;
  year?: number;
  trailerUrl?: string;
  synopsis?: string;
  posterUrl?: string;
  ageRating?: string;
  isActive?: boolean;
}
