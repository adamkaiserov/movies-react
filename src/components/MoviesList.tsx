import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MoviesItem } from './MoviesItem';

interface FetchedMovie {
  id: number;
  url: string;
  title: string;
  year: number;
  summary: string;
  genres: string[];
  language: string;
  rating: number;
  large_cover_image: string;
}

const MoviesListContainer = styled.div`
  margin-top: 34px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

export const MoviesList = () => {
  const [movies, setMovies] = useState<FetchedMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json');

      if (response.ok) {
        const data = await response.json();
        const moviesData = data.data.movies;
        setMovies(moviesData);
      }
    };
    fetchMovies();
  }, []);

  return (
    <MoviesListContainer>
      {movies.map((movie) => (
        <MoviesItem
          image={movie.large_cover_image}
          rating={movie.rating}
          genres={movie.genres}
        />
      ))}
    </MoviesListContainer>
  );
};
