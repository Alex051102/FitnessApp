import{ useEffect } from 'react'
import './ShedulePage.css'
import Calendar from '../../components/common/Calendar/Calendar'
import TodayShedule from '../../components/common/TodayShedule/TodayShedule'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'
import add from '../../assets/icons/addTraining.svg'
type UserProfile = {
  user_id: string
  email: string
  full_name: string
  role: 'user' | 'trainer'
  created_at?: string
}

type Props={
  setterModal:(bool:boolean)=>void;
  setterModalJoin:(bool:boolean)=>void;
   setterTrainingId:(id:string)=>void;
  setterDate:(day:number,month:number)=>void
   date:number[]
   currentUser:UserProfile
}
export default function ShedulePage({setterModal,setterDate,date,currentUser,setterModalJoin,setterTrainingId}:Props) {
     const navigate = useNavigate()
 
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/auth')
      }
    }

    checkAuth()
  }, [navigate])
  
  return (

    <>
    <div className="shedule-page">
      <div className="shedule-page__container">
        <div className="shedule-page__add">
          {currentUser.role=='trainer'?<div onClick={()=>setterModal(true)} className="shedule-page__add-button">
            <img src={add} alt="" />
          </div>:""}
          
        </div>
<Calendar setterDate={setterDate}></Calendar><TodayShedule setterTrainingId={setterTrainingId} setterModalJoin={setterModalJoin} date={date}></TodayShedule>
      </div>

    </div>
    
    </>
  )
}
