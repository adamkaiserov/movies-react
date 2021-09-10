import { configureStore } from '@reduxjs/toolkit';

import { paginationSlice } from './pagination-slice';
import { movieSlice } from './movie-slice';

export const store = configureStore({
  reducer: { pagination: paginationSlice.reducer, movie: movieSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
