import { useState } from 'react'
import { supabase } from '../../../services/supabaseClient'

import intro from '../../../assets/images/intro.svg'
import './LoginForm.css'
type Props = {
  swapeWindow: (bool:boolean) => void
  setterContent :(bool:boolean) => void
}

export function LoginForm({ swapeWindow,setterContent }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  
  const [loading, setLoading] = useState(false)
  
  const [error, setError] = useState<string | null>(null)


   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

 
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Введите корректный email')
      setLoading(false)
      return
    }

    if (!password || password.length < 6) {
      setError('Введите пароль не менее 6 символов')
      setLoading(false)
      return
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

    
      setterContent(true)
     
    
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Ошибка входа'
      setError(message)
      console.error('Ошибка входа:', message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="regitser">
      <div className="register__container">
        <div className="regitser__intro">
          <img className='regitser__intro-img' src={intro} alt="" />
          <h2 className='regitser__intro-title'>Reach your Goals!</h2>
          <p className='regitser__intro-text'>Join Us</p>
        </div>

        <section className='register__main'>
          <form className='register__main-inputs' onSubmit={handleSubmit} >

     
    {error && (
        <div style={{ color: 'red', padding: '8px', backgroundColor: '#ffeaea', borderRadius: '4px' }}>
          Ошибка: {error}
        </div>
      )}
      <input
        type="email"
        className='register__main-input'
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className='register__main-input'
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

    
    <div className="register__main-buttons">
       <button className='register__main-button register__main-button--create' type="submit" disabled={loading}>
        {loading ? 'Sign In...' : 'Sign In'}
      </button>

     
        <button onClick={()=>swapeWindow(false)} className='register__main-button register__main-sign-in' type="button" style={{ color: 'blue' }}>
          Or Register
        </button>
     
    </div>
     
    </form>

        </section>

      </div>
 
    </div>
   
  )
}