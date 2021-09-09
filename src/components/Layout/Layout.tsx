import styled from 'styled-components';

import { MainPagination } from './MainPagination';

const Main = styled.main``;

interface WrapperProps {
  children: React.ReactNode;
}

export const Layout: React.FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <MainPagination />
      <Main className="container">{children}</Main>
    </>
  );
};
