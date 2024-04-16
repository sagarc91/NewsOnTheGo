import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface News {
  id: number
}

interface NewsState {
  news: News[]
}

const initialState: NewsState = {
    news: []
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<News[]>) => {
      state.news = action.payload
    },
  },
})

export const { setNews } = newsSlice.actions

export const selectNews = (state: { news: NewsState }) =>
  state.news

export default newsSlice.reducer
