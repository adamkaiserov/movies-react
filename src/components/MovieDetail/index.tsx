import styled from 'styled-components';
import { FetchedMovie } from '../MoviesList';

const Header = styled.div`
  background-color: #1b1e21;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MovieDetail: React.FC<{ movieData: any }> = ({ movieData }) => {
  const movie: FetchedMovie = movieData[0];

  return (
    <Header>
      <Container className="container">{movie.title}</Container>
    </Header>
  );
};
