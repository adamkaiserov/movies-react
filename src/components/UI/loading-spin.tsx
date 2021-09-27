import styled from 'styled-components';

import loadingSpinner from '../../assets/spinner.svg';

const Center = styled.div`
  text-align: center;
  margin-top: 200px;
`;

export const LoadingSpin = () => {
  return (
    <Center>
      <img src={loadingSpinner} alt="Loading..." />
    </Center>
  );
};
