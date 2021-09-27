import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { filmListAPI } from '../api/film-list-api';
import { MovieType } from './detail-slice';

export interface GenreType {
  id: number;
  name: string;
}

export interface MovieState {
  totalMovies: null | number;
  totalPages: null | number;
  page: null | number;
  movies: MovieType[];
  genres: GenreType[];
  status: string;
  error: string | undefined;
}

const movieInitialState = {
  totalMovies: 500,
  totalPages: 500,
  page: null,
  movies: [],
  genres: [],
  status: 'idle',
  error: '',
} as MovieState;

export type initialMovieStateType = typeof movieInitialState;

export const fetchFilms = createAsyncThunk(
  'movie/fetchFilms',
  async (pageNumber: number) => {
    const response = await filmListAPI.getFilms(pageNumber);
    return response.data;
  }
);

export const movieSlice = createSlice({
  name: 'movie',
  initialState: movieInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.data.movies;
        state.totalMovies = action.payload.data.movie_count;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectMovieById = (state: MovieState, movieId: string) => {
  const result = state.movies.find((movie) => movie.id === movieId);
  return result;
};

export const movieActions = movieSlice.actions;
