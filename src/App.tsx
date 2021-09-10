import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout } from './components/Layout/Layout';
import { MovieDetail } from './components/MovieDetail';
import { MoviesList } from './components/MoviesList';
import { RootState } from './store';

function App() {
  const currentMovie = useSelector(
    (state: RootState) => state.movie.currentMovie
  );

  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <MoviesList />
        </Layout>
      </Route>
      <Route path="/movie-detail">
        <MovieDetail movieData={currentMovie} />
      </Route>
    </Switch>
  );
}

export default App;
