import { useState, useEffect } from 'react'
import { getArticles } from '../api/articles.js'
import ArticleCard from '../components/ArticleCard.jsx'

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading]   = useState(true)
  const [filters, setFilters]   = useState({ tags: '', publishedAfter: '', publishedBefore: '' })

  useEffect(() => { fetchArticles() }, [])

  async function fetchArticles() {
    setLoading(true)
    try {
      const params = {}
      if (filters.tags) params.tags = filters.tags.split(',').map(t => t.trim()).filter(Boolean)
      if (filters.publishedAfter)  params.publishedAfter  = filters.publishedAfter  + 'T00:00:00'
      if (filters.publishedBefore) params.publishedBefore = filters.publishedBefore + 'T23:59:59'
      setArticles(await getArticles(params))
    } finally {
      setLoading(false)
    }
  }

  const set = field => e => setFilters(f => ({ ...f, [field]: e.target.value }))

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Articles</h1>
          <p>Thoughts on software, engineering, and beyond.</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="filters">
          <input
            placeholder="Filter by tags (e.g. react, spring)"
            value={filters.tags}
            onChange={set('tags')}
          />
          <span className="filter-hint">From</span>
          <input
            type="date"
            value={filters.publishedAfter}
            onChange={set('publishedAfter')}
          />
          <span className="filter-hint">To</span>
          <input
            type="date"
            value={filters.publishedBefore}
            onChange={set('publishedBefore')}
          />
          <button className="btn btn-primary" onClick={fetchArticles}>Apply</button>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : articles.length === 0 ? (
          <p className="empty">No articles found.</p>
        ) : (
          <div className="article-grid">
            {articles.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        )}
      </div>
    </div>
  )
}
