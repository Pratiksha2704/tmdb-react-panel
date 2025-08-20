import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../slices/moviesSlice'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'

export default function SearchPage() {
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const term = params.get('q') || ''
  const { items, page, totalPages } = useSelector((s) => s.movies.search)
  const [p, setP] = useState(1)

  useEffect(() => {
    setP(1) // reset when query changes
  }, [term])

  useEffect(() => {
    if (term) dispatch(searchMovies({ query: term, page: p }))
  }, [dispatch, term, p])

  return (
    <section className="section">
      <h2>Search Results for: “{term}”</h2>
      <MovieGrid items={items} />
      <Pagination page={page} totalPages={totalPages} onChange={setP} />
    </section>
  )
}
