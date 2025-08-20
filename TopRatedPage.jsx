import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopRated } from '../slices/moviesSlice'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'

export default function TopRatedPage() {
  const dispatch = useDispatch()
  const { items, page, totalPages } = useSelector((s) => s.movies.topRated)
  const [p, setP] = useState(1)

  useEffect(() => { dispatch(fetchTopRated(p)) }, [dispatch, p])

  return (
    <section className="section">
      <h2>Top Rated</h2>
      <MovieGrid items={items} />
      <Pagination page={page} totalPages={totalPages} onChange={setP} />
    </section>
  )
}
