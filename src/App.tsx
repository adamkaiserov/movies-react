import { Route, Switch } from 'react-router-dom';
import { useAppDispatch } from './hooks';
import { useEffect, useState } from 'react';

import { Layout } from './components/Layout/Layout';
import { MovieDetail } from './components/MovieDetail';
import { MoviesList } from './components/MoviesList';
import { fetchFilms } from './store/movie-slice';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilms(currentPage));
  }, [currentPage, dispatch]);

  return (
    <Switch>
      <Route path="/" exact>
        <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
          <MoviesList />
        </Layout>
      </Route>
      <Route path={`/movies/:movieId`}>
        <MovieDetail />
      </Route>
    </Switch>
  );
};

export default App;
