import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [q, setQ] = useState('')

  useEffect(() => {
    // keep input in sync when navigating back/forward
    const params = new URLSearchParams(location.search)
    setQ(params.get('q') || '')
  }, [location])

  function onSubmit(e) {
    e.preventDefault()
    const query = q.trim()
    if (!query) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">🎬 MoviePanel</Link>
        <nav className="links">
          <Link to="/">Popular</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/upcoming">Upcoming</Link>
        </nav>
      </div>
      <form onSubmit={onSubmit} className="search">
        <input
          type="search"
          placeholder="Search movies..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search movies"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  )
}
