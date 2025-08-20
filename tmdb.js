import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_KEY || 'c45a857c193f6302f2b5061c3b85e743' // fallback for demo
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'
export const PROFILE_BASE = 'https://image.tmdb.org/t/p/w185'

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
})

export default tmdb
