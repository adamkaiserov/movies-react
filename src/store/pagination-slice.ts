import { createSlice } from '@reduxjs/toolkit';

const paginationInitialValue = {
  moviesPerPage: 8,
  currentPage: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: paginationInitialValue,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const paginationActions = paginationSlice.actions;
