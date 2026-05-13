import { Link } from 'react-router-dom'

function readingTime(content) {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

export default function ArticleCard({ article }) {
  const mins = readingTime(article.content)

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        {article.tags?.length > 0 ? (
          <div className="tags">
            {article.tags.slice(0, 3).map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        ) : <span />}
        {article.publishedDate && (
          <span style={{ color: 'var(--muted-light)', fontSize: '0.78rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )}
      </div>

      <h2 className="card-title">
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      </h2>

      <p className="preview">{article.content}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <div className="meta">
          {article.author && <span>By {article.author}</span>}
          {article.author && <span className="meta-sep">·</span>}
          <span>{mins} min read</span>
        </div>
        <Link
          to={`/articles/${article.id}`}
          style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.825rem', fontWeight: '600' }}
        >
          Read →
        </Link>
      </div>
    </div>
  )
}
