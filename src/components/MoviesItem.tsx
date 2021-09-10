import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import star from '../assets/star.svg';
import empty_preview from '../assets/empty-preview.png';
import { movieActions } from '../store/movie-slice';

const HoverBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 32px 67px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 20.7px -20.7px 20.7px rgba(36, 40, 43, 0.1),
    inset -20.7px 20.7px 20.7px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6.4px);
  visibility: hidden;
`;

const ItemContainer = styled.div`
  border: 5px solid #ffffff;
  border-radius: 5px;
  background-color: #fff;
  margin: 1.9rem 1.4rem;
  position: relative;
  color: #ffffff;
  overflow: hidden;
  transition: all 0.2s ease 0s;
  &:hover {
    border: 6px solid #2e95dc;
    text-align: center;
    background-color: #2e95dc;
    ${HoverBlock} {
      visibility: visible;
    }
  }
`;

const IMG = styled.img`
  width: 100%;
`;

const Mark = styled.p`
  font-size: 1.6rem;
  line-height: 1.8rem;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;

const Genres = styled.div`
  font-size: 1.9rem;
  line-height: 2.6rem;
  text-align: center;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  margin-top: -40px;
  & p {
    margin: 0;
  }
`;

const ButtonMore = styled.a`
  font-size: 1.5rem;
  line-height: 1.8rem;
  color: #303539;
  background: #299ded;
  border-radius: 5px;
  padding: 5px 30px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

interface WrapperProps {
  image: string;
  rating: number;
  genres: string[];
  id: number;
}

export const MoviesItem: React.FC<WrapperProps> = ({
  id,
  image,
  rating,
  genres,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentMovieChangeHandler = (value: number) => () => {
    dispatch(movieActions.setCurrentMovieId(value));
    history.push('/movie-detail');
  };

  return (
    <ItemContainer>
      <IMG src={image ? image : empty_preview} alt="Movies Preview" />
      <HoverBlock>
        <div>
          <img src={star} alt="star" />
          <Mark>{rating}</Mark>
        </div>
        <Genres>
          {genres.map((genre) => (
            <p key={genre}>{genre}</p>
          ))}
        </Genres>
        <ButtonMore onClick={currentMovieChangeHandler(id)}>More</ButtonMore>
      </HoverBlock>
    </ItemContainer>
  );
};
