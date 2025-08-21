import { useState } from 'react'
import { RegisterForm } from '../../components/common/RegisterForm/RegisterForm'
import { LoginForm } from '../../components/common/LoginForm/LoginForm'
type Props = {
  setterContent: (bool:boolean) => void
}

export function AuthPage({setterContent}:Props) {
  const [isLogin, setIsLogin] = useState(true)

  function swapeWindow(bool:boolean){
    setIsLogin(bool)
  }
  return (
    <div >
     

      {isLogin ? (
        <LoginForm setterContent={setterContent} swapeWindow={swapeWindow} />
      ) : (
        <RegisterForm setterContent={setterContent} swapeWindow={swapeWindow} />
      )}
    </div>
  )
}