import { Link } from 'react-router-dom'

const skills = {
  'AI / LLMs':  ['LangChain', 'RAG Pipelines', 'Prompt Engineering', 'Vector Databases', 'AI Agents', 'OpenAI', 'Anthropic'],
  Backend:      ['FastAPI', 'SQLAlchemy', 'Pydantic', 'REST APIs', 'Async I/O', 'Microservices', 'ETL Pipelines'],
  'Data & ML':  ['Pandas', 'NumPy', 'Embeddings', 'Model Evaluation', 'Matplotlib'],
  Frontend:     ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'MapLibre GL'],
  DevOps:       ['Docker', 'Nginx', 'GitHub Actions', 'CI/CD', 'AWS (EC2, S3)', 'Linux'],
  Languages:    ['Python', 'Java', 'C/C++', 'SQL', 'JavaScript', 'Bash'],
}

const projects = [
  {
    name: 'FaithMap',
    description:
      'Geospatial platform for mapping religious communities and locations, built with PostGIS spatial queries and a FastAPI backend.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'PostGIS'],
    external: 'https://faithmap.pages.dev/',
  },
  {
    name: 'TechMap',
    description:
      'Tech ecosystem mapper that leverages AWS Lambda for serverless data processing and visualises technology adoption trends.',
    tags: ['AWS Lambda', 'Python', 'REST API'],
    external: 'https://tech-map-two.vercel.app/',
  },
  {
    name: 'Transport Expense Manager',
    description:
      'Python CLI tool for logging, categorising, and reporting transport expenses with export support.',
    tags: ['Python', 'CLI'],
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* ── Hero (always dark) ── */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <p style={s.heroEyebrow}>AI / FullStack Developer</p>
          <h1 style={s.heroName}>Parth Adokar</h1>
          <p style={s.heroBio}>
            Building scalable REST APIs, geospatial systems, and fullstack products
            with modern DevOps practices.
          </p>
          <div style={s.heroCtas}>
            <Link to="/blog" style={s.ctaPrimary}>Read My Blog →</Link>
            <a href="https://github.com/parthadokar" target="_blank" rel="noreferrer" style={s.ctaSecondary}>
              GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section style={s.section}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>Skills</h2>
          <div style={s.skillsGrid}>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} style={s.skillCard}>
                <h3 style={s.skillCategory}>{category}</h3>
                <div style={s.tagRow}>
                  {items.map(skill => <span key={skill} className="tag">{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section style={{ ...s.section, background: 'var(--card)' }}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>Projects</h2>
          <div style={s.projectGrid}>
            {projects.map(p => (
              <div key={p.name} style={s.projectCard}>
                <h3 style={s.projectName}>{p.name}</h3>
                <p style={s.projectDesc}>{p.description}</p>
                <div style={s.tagRow}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                {p.external && (
                  <a href={p.external} target="_blank" rel="noreferrer" style={s.projectLink}>Live Demo →</a>
                )}
                {p.internal && (
                  <Link to={p.internal} style={s.projectLink}>View Blog →</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section style={s.section}>
        <div style={{ ...s.container, textAlign: 'center' }}>
          <h2 style={s.sectionTitle}>Get in Touch</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
            Open to interesting projects and opportunities.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://github.com/parthadokar" target="_blank" rel="noreferrer" className="btn btn-primary">
              Github
            </a>
            <a href="mailto:email@example.com" target="_blank" rel="noreferrer" className="btn btn-primary">
              Mail
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

const s = {
  /* hero always stays dark regardless of theme */
  hero: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: 'white',
    padding: '6rem 1rem',
    textAlign: 'center',
  },
  heroInner:   { maxWidth: '640px', margin: '0 auto' },
  heroEyebrow: { color: '#93c5fd', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' },
  heroName:    { fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: '800', marginBottom: '0.4rem' },
  heroSub:     { color: '#94a3b8', fontSize: '1rem', marginBottom: '1rem' },
  heroBio:     { color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' },
  heroCtas:    { display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' },
  ctaPrimary:  { padding: '0.65rem 1.4rem', borderRadius: '6px', background: '#6366f1', color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' },
  ctaSecondary:{ padding: '0.65rem 1.4rem', borderRadius: '6px', border: '1px solid #475569', color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' },
  /* themed sections */
  section:      { padding: '4rem 1rem', background: 'var(--bg)', transition: 'background 0.2s ease' },
  container:    { maxWidth: '900px', margin: '0 auto' },
  sectionTitle: { fontSize: '1.6rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '1.5rem', color: 'var(--text)' },
  skillsGrid:   { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem' },
  skillCard:    { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem', transition: 'background 0.2s ease' },
  skillCategory:{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' },
  tagRow:       { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' },
  projectGrid:  { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' },
  projectCard:  { background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', transition: 'background 0.2s ease' },
  projectName:  { fontSize: '1.1rem', fontWeight: '600', color: 'var(--text)' },
  projectDesc:  { color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6', flex: 1 },
  projectLink:  { color: 'var(--primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', marginTop: '0.25rem' },
}
