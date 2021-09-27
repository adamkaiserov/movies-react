import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reset from 'styled-reset';

import { store } from './store';
import App from './App';

const GlobalStyle = createGlobalStyle`
	${reset}

  body {
		background: #262A2E;
		font-family: 'Roboto', sans-serif; 
		
    .container {
			width: 100%;
  		max-width: 1196px;
  		margin: 0 auto;
		}
		.error {
			color: white;
			font-size: 30px;
			text-align: center;
			margin-top: 50px;
		}
  }
`;

ReactDOM.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </Provider>
  </>,
  document.getElementById('root')
);
