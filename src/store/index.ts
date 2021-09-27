import { configureStore } from '@reduxjs/toolkit';
import { detailSlice } from './detail-slice';

import { movieSlice } from './movie-slice';

export const store = configureStore({
  reducer: { movie: movieSlice.reducer, detail: detailSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
