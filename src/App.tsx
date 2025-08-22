import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { useState, useEffect } from 'react'
import Home from './pages/Home/Home'

import { supabase } from './services/supabaseClient'
import BottomNav from './components/common/BottomNav/BottomNav'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   
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

    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  
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
       
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Home /> : 
              <Navigate to="/auth" replace />
          } 
        />
        
       
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? 
              <Navigate to="/" replace /> : 
              <AuthPage setterContent={setIsAuthenticated} />
          } 
        />
        
       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav></BottomNav>
    </div>
  )
}

export default App