import styled from 'styled-components';

const PaginationWrapper = styled.div`
  background-color: #1b1e21;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const Logo = styled.div`
  font-size: 25px;
  line-height: 29px;
  color: #ffffff;
`;

const PaginationButtons = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const PaginationButton = styled.li`
  background: #303539;
  border-radius: 50px;
  margin: 0 5.5px;
  padding: 0.3rem 1.5rem;
  font-size: 1.5rem;
  line-height: 1.8rem;
  color: #299ded;
`;

export const MainPagination = () => {
  return (
    <PaginationWrapper>
      <Container className="container">
        <Logo>Movies</Logo>
        <PaginationButtons>
          <PaginationButton>1</PaginationButton>
          <PaginationButton>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
        </PaginationButtons>
      </Container>
    </PaginationWrapper>
  );
};
