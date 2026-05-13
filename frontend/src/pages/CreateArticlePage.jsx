import { useNavigate } from 'react-router-dom'
import { createArticle } from '../api/articles.js'
import ArticleForm from '../components/ArticleForm.jsx'

export default function CreateArticlePage() {
  const navigate = useNavigate()

  async function handleSubmit(data) {
    const article = await createArticle(data)
    navigate(`/articles/${article.id}`)
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>New Article</h1>
          <p>Write and publish a new post.</p>
        </div>
      </div>
      <div className="container" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
        <ArticleForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
