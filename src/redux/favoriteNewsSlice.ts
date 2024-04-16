import { createSlice } from '@reduxjs/toolkit';

const favoriteNewsSlice = createSlice({
  name: 'favoriteNews',
  initialState: [],
  reducers: {
    addFavoriteNews: (state, action) => {
      state.push(action.payload);
    },
    removeFavoriteNews: (state, action) => {
      return state.filter(news => news.url !== action.payload.url);
    },
  },
});

export const { addFavoriteNews, removeFavoriteNews } = favoriteNewsSlice.actions;

export default favoriteNewsSlice.reducer;