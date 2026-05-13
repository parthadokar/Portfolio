import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AboutPage from './pages/AboutPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import CreateArticlePage from './pages/CreateArticlePage.jsx'
import EditArticlePage from './pages/EditArticlePage.jsx'
import LoginPage from './pages/LoginPage.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/"          element={<AboutPage />} />
            <Route path="/blog"      element={<HomePage />} />
            <Route path="/login"     element={<LoginPage />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/articles/new" element={
              <ProtectedRoute><CreateArticlePage /></ProtectedRoute>
            } />
            <Route path="/articles/:id/edit" element={
              <ProtectedRoute><EditArticlePage /></ProtectedRoute>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}
