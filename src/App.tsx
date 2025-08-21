import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { useState, useEffect } from 'react'
import Home from './pages/Home/Home'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { supabase } from './services/supabaseClient'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  function setterContent(bool: boolean) {
    setIsAuthenticated(bool)
  }

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div style={{maxWidth:'450px',minHeight:'660px',border:"1px solid black"}} className="app">
        <Routes>
          <Route 
            path="/auth" 
            element={
              isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <AuthPage setterContent={setterContent} />
            } 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}

export default App