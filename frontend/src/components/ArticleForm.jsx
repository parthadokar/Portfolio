import { useState } from 'react'

export default function ArticleForm({ initial = {}, onSubmit }) {
  const [form, setForm] = useState({
    title:         initial.title || '',
    content:       initial.content || '',
    author:        initial.author || '',
    publishedDate: initial.publishedDate ? initial.publishedDate.slice(0, 16) : '',
    tags:          initial.tags?.join(', ') || ''
  })
  const [error, setError]           = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit({
        title:         form.title,
        content:       form.content,
        author:        form.author || null,
        publishedDate: form.publishedDate ? form.publishedDate + ':00' : null,
        tags:          form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      })
    } catch (err) {
      const data = err.response?.data
      if (data?.errors) setError(data.errors)
      else if (data?.detail) setError({ general: typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail) })
      else setError({ general: 'Something went wrong.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="form-card">
      <form className="article-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input value={form.title} onChange={set('title')} placeholder="Article title" required />
        </div>

        <div className="form-group">
          <label>Content *</label>
          <textarea value={form.content} onChange={set('content')} rows={16} placeholder="Write your article…" required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Author</label>
            <input value={form.author} onChange={set('author')} placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Published Date</label>
            <input type="datetime-local" value={form.publishedDate} onChange={set('publishedDate')} />
          </div>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input value={form.tags} onChange={set('tags')} placeholder="react, spring, tutorial" />
        </div>

        {error && (
          <div className="error">
            {Object.entries(error).map(([k, v]) => <p key={k}>{v}</p>)}
          </div>
        )}

        <div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save Article'}
          </button>
        </div>
      </form>
    </div>
  )
}
