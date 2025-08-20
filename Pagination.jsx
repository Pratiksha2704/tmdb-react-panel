export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <div className="pagination">
      <button onClick={() => onChange(1)} disabled={!canPrev}>&laquo; First</button>
      <button onClick={() => onChange(page - 1)} disabled={!canPrev}>Prev</button>
      <span className="pages">Page {page} / {totalPages}</span>
      <button onClick={() => onChange(page + 1)} disabled={!canNext}>Next</button>
      <button onClick={() => onChange(totalPages)} disabled={!canNext}>Last &raquo;</button>
    </div>
  )
}
