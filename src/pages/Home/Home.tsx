import { useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useNavigate } from 'react-router-dom'

interface HomeProps {
  content?: boolean;
}

export default function Home({ content }: HomeProps) {
  const navigate = useNavigate()
  console.log(content)
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/auth')
      }
    }

    checkAuth()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    // После выхода ProtectedRoute автоматически перенаправит на /auth
  }

  return (
    <div>
      <h1>Домашняя страница</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  )
}