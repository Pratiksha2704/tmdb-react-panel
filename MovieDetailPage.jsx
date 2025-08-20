import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchMovieDetail, fetchMovieCredits, reset } from '../slices/movieSlice'
import { IMAGE_BASE, PROFILE_BASE } from '../api/tmdb'

export default function MovieDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { detail, credits, status } = useSelector((s) => s.movie)

  useEffect(() => {
    dispatch(fetchMovieDetail(id))
    dispatch(fetchMovieCredits(id))
    return () => dispatch(reset())
  }, [dispatch, id])

  if (status === 'loading' || !detail) return <p className="muted">Loading...</p>

  const poster = detail.poster_path ? `${IMAGE_BASE}${detail.poster_path}` : '/no-poster.png'

  return (
    <section className="section">
      <Link to="/" className="back">&larr; Back</Link>
      <div className="detail">
        <img className="detail-poster" src={poster} alt={detail.title} />
        <div className="detail-body">
          <h2>{detail.title}</h2>
          <p className="muted">{detail.tagline}</p>
          <p>{detail.overview}</p>
          <div className="facts">
            <span>⭐ {detail.vote_average?.toFixed(1)}</span>
            <span>⏱ {detail.runtime} min</span>
            <span>📅 {detail.release_date}</span>
            <span>🎭 {detail.genres?.map(g => g.name).join(', ')}</span>
          </div>
        </div>
      </div>

      <h3>Cast</h3>
      <div className="cast-grid">
        {credits.cast?.slice(0, 12).map(member => {
          const profile = member.profile_path ? `${PROFILE_BASE}${member.profile_path}` : '/no-profile.png'
          return (
            <div className="cast-card" key={member.cast_id || member.credit_id}>
              <img src={profile} alt={member.name} loading="lazy" />
              <div className="cast-name">{member.name}</div>
              <div className="cast-role" title={member.character}>{member.character}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
