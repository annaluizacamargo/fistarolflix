import { createContext, useContext, useState } from 'react'
import { IMovie } from '@/types/movie'

type MovieContextType = {
  movies: IMovie[]
  setMovies: (movie: IMovie[] | []) => void
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<IMovie[]>([])

  return <MovieContext.Provider value={{ movies, setMovies }}>{children}</MovieContext.Provider>
}

export const useMovieContext = () => {
  const context = useContext(MovieContext)

  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider')
  }

  return context
}
