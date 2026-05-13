import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getArticle, updateArticle } from '../api/articles.js'
import ArticleForm from '../components/ArticleForm.jsx'

export default function EditArticlePage() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    getArticle(id).then(setArticle)
  }, [id])

  async function handleSubmit(data) {
    await updateArticle(id, data)
    navigate(`/articles/${id}`)
  }

  if (!article) return <div className="spinner" style={{ marginTop: '6rem' }} />

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Edit Article</h1>
          <p>Update your post.</p>
        </div>
      </div>
      <div className="container" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
        <ArticleForm initial={article} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
