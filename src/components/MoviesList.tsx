import styled from 'styled-components';

import { useAppSelector } from '../hooks';
import { MoviesItem } from './MoviesItem';
import { MovieType } from '../store/detail-slice';
import { LoadingSpin } from './UI/loading-spin';

const MoviesListContainer = styled.div`
  margin-top: 34px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

export const MoviesList = () => {
  const movies: MovieType[] = useAppSelector((state) => state.movie.movies);
  const status: string = useAppSelector((state) => state.movie.status);
  const error: string | undefined = useAppSelector(
    (state) => state.movie.error
  );

  if (status === 'loading') {
    return <LoadingSpin />;
  }

  if (status === 'failed') {
    return <p className="error">{error}</p>;
  }

  return (
    <MoviesListContainer>
      {movies.map((movie: MovieType) => (
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
