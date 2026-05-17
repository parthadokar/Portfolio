import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticle, deleteArticle } from '../api/articles.js'
import { useAuth } from '../context/AuthContext.jsx'

function readingTime(content) {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

export default function ArticlePage() {
  const { id }              = useParams()
  const navigate            = useNavigate()
  const { isAuthenticated } = useAuth()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticle(id)
      .then(setArticle)
      .catch(() => navigate('/blog'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleDelete() {
    if (!confirm('Delete this article?')) return
    await deleteArticle(id)
    navigate('/blog')
  }

  if (loading) return <div className="spinner" style={{ marginTop: '6rem' }} />
  if (!article) return null

  const mins = readingTime(article.content)

  return (
    <div>
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="article-actions">
            <Link to="/blog" className="btn">← Back</Link>
            {isAuthenticated && (
              <div>
                <Link to={`/articles/${id}/edit`} className="btn">Edit</Link>
                <button onClick={handleDelete} className="btn btn-danger">Delete</button>
              </div>
            )}
          </div>

          {article.tags?.length > 0 && (
            <div className="tags" style={{ marginTop: '1.25rem' }}>
              {article.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          )}

          <h1>{article.title}</h1>

          <div className="article-hero-meta">
            {article.author && <span>By {article.author}</span>}
            {article.author && <span className="meta-sep">·</span>}
            {article.publishedDate && (
              <span>
                {new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
            {article.publishedDate && <span className="meta-sep">·</span>}
            <span>{mins} min read</span>
          </div>
        </div>
      </div>

      <div className="article-body">
        <hr className="article-divider" />
        <ReactMarkdown className="article-content" remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
