import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'All Products',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { updateTitle } = homeSlice.actions;
export default homeSlice.reducer;
