import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tmdb from '../api/tmdb'

export const fetchMovieDetail = createAsyncThunk('movie/fetchDetail', async (id) => {
  const { data } = await tmdb.get(`/movie/${id}`)
  return data
})

export const fetchMovieCredits = createAsyncThunk('movie/fetchCredits', async (id) => {
  const { data } = await tmdb.get(`/movie/${id}/credits`)
  return data
})

const initialState = {
  detail: null,
  credits: { cast: [], crew: [] },
  status: 'idle',
  error: null
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset(state) {
      state.detail = null
      state.credits = { cast: [], crew: [] }
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.detail = action.payload
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.credits = action.payload
      })
  }
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer
