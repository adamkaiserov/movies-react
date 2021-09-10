import { createSlice } from '@reduxjs/toolkit';

const movieInitialState = {
  currentMovieId: null,
  movies: [],
  currentMovie: {},
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState: movieInitialState,
  reducers: {
    setCurrentMovieId(state, action) {
      state.currentMovieId = action.payload;
      state.currentMovie = state.movies.filter(
        (movie: any) => movie.id === state.currentMovieId
      );
    },
    setCurrentMovieData(state, action) {
      state.movies = action.payload;
    },
  },
});

export const movieActions = movieSlice.actions;
