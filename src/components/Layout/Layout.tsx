import styled from 'styled-components';

import { MainPagination } from './MainPagination';

const Main = styled.main``;

interface WrapperProps {
  children: React.ReactNode;
  currentPage: number;
  setCurrentPage: Function;
}

export const Layout: React.FC<WrapperProps> = ({
  children,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <>
      <MainPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageNeighbours={1}
      />
      <Main className="container">{children}</Main>
    </>
  );
};
