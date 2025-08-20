import { useNavigate } from 'react-router-dom'
import { IMAGE_BASE } from '../api/tmdb'

export default function MovieCard({ movie }) {
  const navigate = useNavigate()
  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : '/no-poster.png'

  return (
    <div className="card" onClick={() => navigate(`/movie/${movie.id}`)} role="button" tabIndex={0}>
      <img src={poster} alt={movie.title} loading="lazy" />
      <div className="card-body">
        <h3 className="title">{movie.title}</h3>
        <p className="meta">⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</p>
        <p className="meta">{movie.release_date || '—'}</p>
      </div>
    </div>
  )
}
