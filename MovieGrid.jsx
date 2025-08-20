import MovieCard from './MovieCard'

export default function MovieGrid({ items }) {
  if (!items?.length) {
    return <p className="muted">No results.</p>
  }
  return (
    <div className="grid">
      {items.map((m) => <MovieCard key={m.id} movie={m} />)}
    </div>
  )
}
