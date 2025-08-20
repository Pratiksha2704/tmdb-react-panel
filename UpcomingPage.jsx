import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUpcoming } from '../slices/moviesSlice'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'

export default function UpcomingPage() {
  const dispatch = useDispatch()
  const { items, page, totalPages } = useSelector((s) => s.movies.upcoming)
  const [p, setP] = useState(1)

  useEffect(() => { dispatch(fetchUpcoming(p)) }, [dispatch, p])

  return (
    <section className="section">
      <h2>Upcoming</h2>
      <MovieGrid items={items} />
      <Pagination page={page} totalPages={totalPages} onChange={setP} />
    </section>
  )
}
