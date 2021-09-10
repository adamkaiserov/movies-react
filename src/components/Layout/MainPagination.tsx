import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { paginationActions } from '../../store/pagination-slice';

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
  cursor: pointer;
  color: #299ded;
  &:hover {
    color: #606365;
  }
`;

export const MainPagination = () => {
  const dispatch = useDispatch();

  const totalMovies = 20;
  const pageNumbers: number[] = [];

  const moviesPerPage = useSelector(
    (state: RootState) => state.pagination.moviesPerPage
  );

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  const currentPageChangeHandler = (value: number) => () => {
    dispatch(paginationActions.setCurrentPage(value));
  };

  return (
    <PaginationWrapper>
      <Container className="container">
        <Logo>Movies</Logo>
        <PaginationButtons>
          {pageNumbers.map((pageNum) => (
            <PaginationButton
              key={pageNum}
              onClick={currentPageChangeHandler(pageNum)}
            >
              {pageNum}
            </PaginationButton>
          ))}
        </PaginationButtons>
      </Container>
    </PaginationWrapper>
  );
};
