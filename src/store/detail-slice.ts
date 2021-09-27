import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filmListAPI } from '../api/film-list-api';

export const fetchDetail = createAsyncThunk(
  'detail/fetchDetail',
  async (movieId: string) => {
    const response = await filmListAPI.getDetails(movieId);
    return response.data;
  }
);

export interface MovieType {
  id: string;
  url: string;
  title: string;
  year: number;
  description_full: string;
  genres: string[];
  language: string;
  rating: number;
  large_cover_image: string;
}

export interface GenreType {
  id: number;
  name: string;
}

interface DetailState {
  movie: MovieType;
  genres: [];
  status: string;
  error: string | undefined;
}

const detailInitialState = {
  movie: {},
  genres: [],
  status: 'idle',
  error: '',
} as DetailState;

export const detailSlice = createSlice({
  name: 'detail',
  initialState: detailInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload.data.movie;
        state.genres = action.payload.data.movie.genres;
      })
      .addCase(fetchDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
