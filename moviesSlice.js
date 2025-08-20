import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tmdb from '../api/tmdb'

export const fetchPopular = createAsyncThunk('movies/fetchPopular', async (page = 1) => {
  const { data } = await tmdb.get('/movie/popular', { params: { page } })
  return { ...data, pageType: 'popular' }
})

export const fetchTopRated = createAsyncThunk('movies/fetchTopRated', async (page = 1) => {
  const { data } = await tmdb.get('/movie/top_rated', { params: { page } })
  return { ...data, pageType: 'topRated' }
})

export const fetchUpcoming = createAsyncThunk('movies/fetchUpcoming', async (page = 1) => {
  const { data } = await tmdb.get('/movie/upcoming', { params: { page } })
  return { ...data, pageType: 'upcoming' }
})

export const searchMovies = createAsyncThunk('movies/searchMovies', async ({ query, page = 1 }) => {
  const { data } = await tmdb.get('/search/movie', { params: { query, page, include_adult: false } })
  return { ...data, pageType: 'search', query }
})

const sectionState = () => ({ items: [], page: 1, totalPages: 1, totalResults: 0, status: 'idle', error: null, query: '' })

const initialState = {
  popular: sectionState(),
  topRated: sectionState(),
  upcoming: sectionState(),
  search: sectionState()
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const addCases = (thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          // no-op
        })
        .addCase(thunk.fulfilled, (state, action) => {
          const { results, page, total_pages, total_results, pageType, query } = action.payload
          const target = state[pageType]
          target.items = results
          target.page = page
          target.totalPages = total_pages
          target.totalResults = total_results
          target.status = 'succeeded'
          if (pageType === 'search') target.query = query || ''
        })
        .addCase(thunk.rejected, (state, action) => {
          const pageType = action.meta.arg?.pageType || (action.type.includes('search') ? 'search' : null)
          if (pageType) {
            const target = state[pageType]
            target.status = 'failed'
            target.error = action.error.message
          }
        })
    }

    addCases(fetchPopular)
    addCases(fetchTopRated)
    addCases(fetchUpcoming)
    addCases(searchMovies)
  }
})

export default moviesSlice.reducer
