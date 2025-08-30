import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { useState, useEffect } from 'react'
import Home from './pages/Home/Home'

import { supabase } from './services/supabaseClient'
import BottomNav from './components/common/BottomNav/BottomNav'
import Trainings from './pages/Trainings/Trainings'
import ShedulePage from './pages/ShedulePage/ShedulePage'
import ModalAdd from './components/common/ModalAdd/ModalAdd'
type UserProfile = {
  user_id: string
  email: string
  full_name: string
  role: 'user' | 'trainer'
  created_at?: string
}
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
const [modalAdd,setModalAdd]=useState(true)
const [date,setDate]=useState([0,1])
  const [currentUser,setCurrentUser]=useState<UserProfile>({
  user_id: '',
  email: '',
  full_name: '',
  role: 'user' ,
  
})
  function userDataSetter(data:UserProfile){
    setCurrentUser(data)
  }
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
function setterModal(bool:boolean){
setModalAdd(bool)
}
function setterDate(day:number,month:number){
setDate([day,month])
}
  return (
    <div style={{maxWidth:'450px',minHeight:'660px',border:"1px solid black",position:"relative"}} className="app">
      
      {modalAdd==true?<ModalAdd currentUser={currentUser} date={date} setterModal={setterModal}></ModalAdd>:""}
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
          path="/trainings" 
          element={
            isAuthenticated ? 
              <Trainings currentUser={currentUser}></Trainings> : 
              <Navigate to="/auth" replace />
          } 
        />
        
       
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? 
              <Navigate to="/" replace /> : 
              <AuthPage userDataSetter={userDataSetter} setterContent={setIsAuthenticated} />
          } 
        />
        <Route 
          path="/shedule" 
          element={
            isAuthenticated ? <ShedulePage date={date} setterDate={setterDate} setterModal={setterModal}></ShedulePage>
               : <Navigate to="/" replace />
              
          } 
        />
       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav></BottomNav>
    </div>
  )
}

export default App