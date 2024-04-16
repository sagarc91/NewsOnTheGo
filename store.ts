import { configureStore } from '@reduxjs/toolkit';
import favoriteNewsReducer from './src/redux/favoriteNewsSlice';
import profileReducer from './src/redux//profileSlice';

const store = configureStore({
  reducer: {
    favoriteNews: favoriteNewsReducer,
    profile: profileReducer,
  },
});

export default store;