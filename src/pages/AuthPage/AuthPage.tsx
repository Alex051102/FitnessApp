import { useState } from 'react'
import { RegisterForm } from '../../components/common/RegisterForm/RegisterForm'
import { LoginForm } from '../../components/common/LoginForm/LoginForm'
type UserProfile = {
  user_id: string
  email: string
  full_name: string
  role: 'user' | 'trainer'
  created_at?: string
}
type Props = {
  setterContent: (bool:boolean) => void
  userDataSetter : (data :UserProfile)=>void
}

export function AuthPage({setterContent,userDataSetter}:Props) {
  const [isLogin, setIsLogin] = useState(true)

  function swapeWindow(bool:boolean){
    setIsLogin(bool)
  }
  return (
    <div >
     

      {isLogin ? (
        <LoginForm userDataSetter={userDataSetter} setterContent={setterContent} swapeWindow={swapeWindow} />
      ) : (
        <RegisterForm userDataSetter={userDataSetter} setterContent={setterContent} swapeWindow={swapeWindow} />
      )}
    </div>
  )
}