import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { useState, useEffect } from 'react'
import Home from './pages/Home/Home'
/* import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute' */
import { supabase } from './services/supabaseClient'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Проверяем текущую сессию при загрузке
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setIsAuthenticated(!!session)
      } catch (error) {
        console.error('Ошибка проверки сессии:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Слушаем изменения авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Показываем заглушку во время загрузки
  if (loading) {
    return (
      <div style={{maxWidth:'450px',minHeight:'660px',border:"1px solid black"}} className="app">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{maxWidth:'450px',minHeight:'660px',border:"1px solid black"}} className="app">
      <Routes>
        {/* Если авторизован - показываем Home, если нет - перенаправляем на auth */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Home /> : 
              <Navigate to="/auth" replace />
          } 
        />
        
        {/* Если не авторизован - показываем AuthPage, если авторизован - перенаправляем на главную */}
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? 
              <Navigate to="/" replace /> : 
              <AuthPage setterContent={setIsAuthenticated} />
          } 
        />
        
        {/* Все остальные пути перенаправляем на главную */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App