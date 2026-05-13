import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
}

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(getTheme)

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Parth Adokar</Link>

      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'btn btn-nav-active' : 'btn'}>
          About
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? 'btn btn-nav-active' : 'btn'}>
          Blog
        </NavLink>

        <button onClick={toggleTheme} className="btn theme-btn" title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
          {isDark ? '☀' : '☾'}
        </button>

        {isAuthenticated ? (
          <>
            <Link to="/articles/new" className="btn btn-primary">+ New</Link>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </nav>
  )
}
