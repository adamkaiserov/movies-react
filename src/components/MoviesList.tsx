import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { MoviesItem } from './MoviesItem';
import loadingSpinner from '../assets/spinner.svg';
import { RootState } from '../store';
import { movieActions } from '../store/movie-slice';

export interface FetchedMovie {
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

const Center = styled.div`
  text-align: center;
  margin-top: 150px;
`;

export const MoviesList = () => {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState<FetchedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const moviesPerPage = useSelector(
    (state: RootState) => state.pagination.moviesPerPage
  );
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const response = await fetch('https://yts.mx/api/v2/list_movies.json');

      if (response.ok) {
        const data = await response.json();
        setMovies(data.data.movies);
        setIsLoading(false);
        dispatch(movieActions.setCurrentMovieData(data.data.movies));
      } else {
        // throw new Error('ffffffff');
      }
    };
    fetchMovies();
    // .catch((error) => {
    //   alert(error);
    //   setIsLoading(false);
    // });
  }, []);

  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMovies = movies.slice(firstMovieIndex, lastMovieIndex);

  if (isLoading) {
    return (
      <Center>
        <img src={loadingSpinner} alt="" />
      </Center>
    );
  }

  return (
    <MoviesListContainer>
      {currentMovies.map((movie) => (
        <MoviesItem
          key={movie.id}
          id={movie.id}
          image={movie.large_cover_image}
          rating={movie.rating}
          genres={movie.genres}
        />
      ))}
    </MoviesListContainer>
  );
};
