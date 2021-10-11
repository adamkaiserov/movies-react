import styled from 'styled-components';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';

import back_button from '../../assets/go-back-button.png';
import { LoadingSpin } from '../UI/loading-spin';
import { Comments } from './Comments';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchDetail } from '../../store/detail-slice';
import { MovieType } from '../../store/detail-slice';

const DetailWrapper = styled.div`
  color: #fff;
`;

const Header = styled.div`
  background-color: #1b1e21;
  padding: 11px 30px;
  & p {
    font-size: 1.5rem;
    line-height: 1.8rem;
  }
  & img {
    cursor: pointer;
    @media (max-width: 478px) {
      transform: scale(0.8);
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
  & h2 {
    font-size: 3rem;
    line-height: 3.7rem;
  }
  & div {
    flex: 0 1 50%;
    @media (max-width: 1240px) {
      padding: 0px 30px;
    }
    @media (max-width: 1070px) {
      flex: 0 1 49%;
    }
    @media (max-width: 478px) {
      padding: 0px 10px;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }

  .image-div {
    text-align: center;
  }

  .bg-image {
    max-width: 100%;
  }

  .year {
    font-weight: 200;
    font-size: 2.1rem;
    line-height: 2.5rem;
    display: block;
    margin-bottom: 1.3rem;
  }

  .subtitle {
    font-weight: 500;
    font-size: 1.9rem;
    line-height: 2.2rem;
    margin-bottom: 0.8rem;
  }

  .description {
    font-weight: 300;
    font-size: 1.25rem;
    line-height: 1.5rem;
    margin-bottom: 1.3rem;
  }
`;

const Genres = styled.ul`
  display: flex;
  @media (max-width: 478px) {
    flex-direction: column;
  }
  margin-bottom: 22px;
  li {
    margin-right: 20px;
    display: flex;
    align-items: center;
    &:before {
      content: '';
      width: 13px;
      height: 13px;
      background-color: #606365;
      border-radius: 50%;
      display: inline-block;
      margin-right: 5px;
    }
  }
`;

interface ParamsProps {
  movieId: string;
}

export const MovieDetail = () => {
  const match = useRouteMatch<ParamsProps>();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { movieId } = match.params;

  const movie: MovieType = useAppSelector((state) => state.detail.movie);
  const genres = useAppSelector((state) => state.detail.genres);
  const status: string = useAppSelector((state) => state.detail.status);
  const error: string | undefined = useAppSelector(
    (state) => state.detail.error
  );
  console.log('genres', genres);

  useEffect(() => {
    dispatch(fetchDetail(movieId));
  }, [dispatch, movieId]);

  if (status === 'loading') {
    return <LoadingSpin />;
  }

  if (status === 'failed') {
    return <p className="error">{error}</p>;
  }

  return (
    <DetailWrapper>
      <Header>
        <Container className="container">
          <p>{movie.title}</p>
          <img
            onClick={() => {
              history.replace('/');
            }}
            src={back_button}
            alt=""
          />
        </Container>
      </Header>
      <Body className="container">
        <div className="image-div">
          <img className="bg-image" src={movie.large_cover_image} alt="" />
        </div>
        <div>
          <h2>{movie.title}</h2>
          <p className="year">{movie.year}</p>
          <Genres>
            {genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </Genres>
          <h5 className="subtitle">Synopsis</h5>
          <p className="description">{movie.description_full}</p>
          <h5 className="subtitle">Comments</h5>
          <Comments filmId={+movie.id} />
        </div>
      </Body>
    </DetailWrapper>
  );
};
