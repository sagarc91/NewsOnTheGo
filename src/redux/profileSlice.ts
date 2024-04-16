import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: { picture: null },
  reducers: {
    setProfilePicture: (state, action) => {
      state.picture = action.payload;
    },
  },
});

export const { setProfilePicture } = profileSlice.actions;

export default profileSlice.reducer;