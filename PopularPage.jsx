import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopular } from '../slices/moviesSlice'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'

export default function PopularPage() {
  const dispatch = useDispatch()
  const { items, page, totalPages } = useSelector((s) => s.movies.popular)
  const [p, setP] = useState(1)

  useEffect(() => { dispatch(fetchPopular(p)) }, [dispatch, p])

  return (
    <section className="section">
      <h2>Popular Movies</h2>
      <MovieGrid items={items} />
      <Pagination page={page} totalPages={totalPages} onChange={setP} />
    </section>
  )
}
