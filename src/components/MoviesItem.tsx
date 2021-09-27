import styled from 'styled-components';
import { Link } from 'react-router-dom';

import star from '../assets/star.svg';
import empty_preview from '../assets/empty-preview.png';

const HoverBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem 3.1rem;
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
  max-width: 280px;
  transition: all 0.2s ease 0s;
  @media (max-width: 768px) {
    margin: 1.9rem auto;
  }
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

const ButtonMore = styled.div`
  font-size: 1.5rem;
  line-height: 1.8rem;
  background: #299ded;
  border-radius: 5px;
  padding: 5px 0px;
  cursor: pointer;
  a {
    color: #303539;
    text-decoration: none;
    padding: 5px 30px;
    &:hover {
      color: #fff;
    }
  }
`;

interface WrapperProps {
  id: string;
  image: string;
  rating: number;
  genres: string[];
}

export const MoviesItem: React.FC<WrapperProps> = ({
  id,
  image,
  rating,
  genres,
}) => {
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
        <ButtonMore>
          <Link className="button-more" to={`/movies/${id}`}>
            More
          </Link>
        </ButtonMore>
      </HoverBlock>
    </ItemContainer>
  );
};
