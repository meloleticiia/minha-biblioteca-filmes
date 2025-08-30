import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const defaultParams = {
  api_key: process.env.REACT_APP_API_KEY,
  language: 'pt-BR',
  include_adult: false
}

export const IMG_BASE = process.env.REACT_APP_IMG_BASE

export async function trendingMovies() {
  const resposta = await api.get('/trending/movie/day', {
    params: defaultParams
  })
  return resposta.data.results || []
}

export async function popularMovies() {
  const resposta = await api.get('/movie/popular', { params: defaultParams })
  return resposta.data.results || []
}

export async function topRatedMovies() {
  const resposta = await api.get('/movie/top_rated', { params: defaultParams })
  return resposta.data.results || []
}

export async function discoverByGenre(genreId) {
  const resposta = await api.get('/discover/movie', {
    params: { ...defaultParams, with_genres: genreId }
  })
  return resposta.data.results || []
}

export async function searchMovies(query) {
  const q = (query || '').trim()
  if (!q) return []

  const resposta = await api.get('/search/movie', {
    params: { ...defaultParams, query: q }
  })
  return resposta.data.results || []
}

export async function getMovie(id) {
  const resposta = await api.get(`/movie/${id}`, { params: defaultParams })
  return resposta.data
}
