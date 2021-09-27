import styled from 'styled-components';

import { useAppSelector } from '../../hooks';
import { range } from '../../utils/range';

const PaginationWrapper = styled.div`
  background-color: #1b1e21;
  @media (max-width: 1240px) {
    padding: 0px 20px;
  }
  @media (max-width: 550px) {
    padding: 0px 5px;
  }
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
  @media (max-width: 768px) {
    display: none;
  }
`;

const PaginationButtons = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    margin: 0 auto;
  }
  span {
    color: #fff;
    font-size: 1.5rem;
    @media (max-width: 550px) {
      font-size: 1.2rem;
      margin: 5px 2px;
    }
  }
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
  @media (max-width: 992px) {
    transform: scale(0.9);
    padding: 0.3rem 1.3rem;
    margin: 0 3.5px;
  }
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0 2.5px;
  }
  @media (max-width: 550px) {
    transform: scale(0.8);
    font-size: 1rem;
    padding: 0.3rem 0.8rem;
    margin: 0 -1px;
  }
  &:hover {
    background-color: #47494b;
  }
  &.active {
    color: #fff;
  }
`;

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

interface PaginationProps {
  pageNeighbours: number;
  currentPage: number;
  setCurrentPage: Function;
}

export const MainPagination: React.FC<PaginationProps> = ({
  pageNeighbours,
  currentPage,
  setCurrentPage,
}) => {
  const totalMovies = useAppSelector((state) => state.movie.totalMovies);

  const totalPages = totalMovies ? Math.ceil(totalMovies / 20) : 0;

  let neighbours = Math.max(0, Math.min(pageNeighbours, 2));
  const totalNumbers = neighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;
  let pagesNumbers = range(1, totalPages);
  let pages: any = [];
  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    pages = range(startPage, endPage);
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);
    switch (true) {
      // handle: (1) < {5 6} [7] {8 9} (10)
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }

      // handle: (1) {2 3} [4] {5 6} > (10)
      case !hasLeftSpill && hasRightSpill: {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }

      // handle: (1) < {4 5} [6] {7 8} > (10)
      case hasLeftSpill && hasRightSpill:
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        break;
      }
    }
    pagesNumbers = [1, ...pages, totalPages];
  }

  return (
    <PaginationWrapper>
      <Container className="container">
        <Logo>Movies</Logo>
        <PaginationButtons>
          {pagesNumbers.map((page: string | number, index: number) => {
            if (page === LEFT_PAGE) return <span key={index}>...</span>;
            if (page === RIGHT_PAGE) return <span key={index}>...</span>;
            return (
              <PaginationButton
                className={currentPage === page ? 'active' : ''}
                key={index}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationButton>
            );
          })}
        </PaginationButtons>
      </Container>
    </PaginationWrapper>
  );
};
