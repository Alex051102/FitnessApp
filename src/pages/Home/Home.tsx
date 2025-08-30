import { useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useNavigate } from 'react-router-dom'
import './Home.css'
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
   
  }

  return (
    <div>
      <div className="home">
        <div className="home__container">
          <div className="home__welcome">
            <h2 onClick={handleLogout} className='home__welcome-text'>Welcome back,</h2>
            <p className='home__welcome-text-name'>Alex Pleskunin</p>
            
          </div>
          <div className="home__time">
            <div className="home__time-block">
              <div className="home__time-block-container">
                <p className='home__time-block-text home__time-block-text--big'>08:30 <span className='home__time-block-text--grey'>am</span></p>
                <p className='home__time-block-text'>Saint-Petersburg</p>
              </div>
            </div>
          </div>
          <div className="home__notification">
            <div className="home__notification-container">
              <p className='home__notification-text home__notification-text--big'>Next training at 09:00</p>
              <p className='home__notification-text'>Don’t keep your potential clients waiting longer!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}