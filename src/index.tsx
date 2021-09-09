import ReactDOM from 'react-dom';
import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

import App from './App';

const GlobalStyle = createGlobalStyle`
 ${normalize}

  body {
		background: #262A2E;
		font-family: 'Roboto', sans-serif; 
    .container {
			width: 100%;
  		max-width: 1196px;
  		margin: 0 auto;
		}
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root')
);
