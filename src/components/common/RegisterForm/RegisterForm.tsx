import { useState } from 'react'
import { supabase } from '../../../services/supabaseClient'

import intro from '../../../assets/images/intro.svg'
import './RegisterForm.css'
type Props = {
  swapeWindow: (bool:boolean) => void
  setterContent :(bool:boolean) => void
}

export function RegisterForm({ swapeWindow,setterContent }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'user' | 'trainer'>('user') 
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

  try {
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) throw error

    if (data.user) {
      
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(
          {
            user_id: data.user.id,
            email: data.user.email,
            full_name: fullName,
            role
          },
          { onConflict: 'user_id' }
        )

      if (profileError) {
        console.error('Ошибка upsert профиля:', profileError)
        
      }

      setterContent(true)
      
      
    } else {
     
      alert('Пользователь с таким email уже существует.')
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ошибка регистрации'
    setError(message)
    console.error(message)
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
        type="text"
        className='register__main-input'
        placeholder="Ваше имя"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <input
        type="email"
        className='register__main-input'
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {error}
      <input
        type="password"
        className='register__main-input'
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

     
      <div className='register__main-labels'>
        <label className={`register__main-label ${role=='user'?'register__main-label--current':""}`}>
          <input
            type="radio"
            className={`register__main-label-input`}
            checked={role === 'user'}
            onChange={() => setRole('user')}
          />
          Пользователь
        </label>
        <label className={`register__main-label ${role=='trainer'?'register__main-label--current':""}`}>
          <input
            type="radio"
             className='register__main-label-input'
            checked={role === 'trainer'}
            onChange={() => setRole('trainer')}
          />
          Тренер
        </label>
      </div>

      
    <div className="register__main-buttons">
       <button className='register__main-button register__main-button--create' type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Account'}
      </button>

     
        <button onClick={()=>swapeWindow(true)} className='register__main-button register__main-sign-in' type="button" style={{ color: 'blue' }}>
          Or Sign In
        </button>
     
    </div>

     
    </form>

        </section>

      </div>
 
    </div>
   
  )
}