import { useEffect, useState } from 'react'
import './TodayShedule.css'
import { supabase } from '../../../services/supabaseClient'
type UserProfile = {
  user_id: string
  email: string
  full_name: string
  role: 'user' | 'trainer'
  created_at?: string
}
export interface Training {
  id: string;
  trainer_id: string;
  title: string;
  date: string;
  start_time: string;
  duration: number;
  max_participants: number;
  participants: UserProfile[];
  created_at: string;
  updated_at: string;
  trainer_data:UserProfile
}
type Props={
   date:number[]
}
export default function TodayShedule({date}:Props) {
  const [trainings, setTrainings] = useState<Training[]>([])
  const getAllTrainings = async (): Promise<Training[]> => {
  try {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .order('date', { ascending: true })
      .order('start_time', { ascending: true })

    if (error) {
      console.error('Ошибка получения тренировок:', error)
      return []
    }

    return data || []
    
  } catch (error) {
    console.error('Ошибка:', error)
    return []
  }
}
  useEffect(() => {
    const loadTrainings = async () => {
      const data = await getAllTrainings()
      setTrainings(data)
    }
    
    loadTrainings()
  }, [])
  
  function normalizeDate(){
    
    if(date[0]>9 && date[1]>9){
      return `2025-${date[0]}-${date[1]}`
    }
    if(date[0]<10 && date[1]>9){
      
      return `2025-0${date[0]}-${date[1]}`
    }
    if(date[0]>9 && date[1]<10){
      
      return `2025-${date[0]}-0${date[1]}`
    }
    if(date[0]<10 && date[1]<10){
      
      return `2025-0${date[0]}-0${date[1]}`
    }
  }
  return (
    <>
      <div className="today-shedule">
        <div className="today-shedule__container">
          <h2 className="today-shedule__title">Today’s Schedule</h2>
          <div className="today-shedule__list">
            {trainings.map(tr=>(
              normalizeDate()==tr.date?
<div className="today-shedule__list-item">
              <p className='today-shedule__list-item-time'>{tr.start_time}</p>
              <div className="today-shedule__list-item-info">
                <div className="today-shedule__list-item-name">
                  <p className="today-shedule__list-item-name-text">{tr.trainer_data.full_name}</p>
                </div>
                <p className="today-shedule__list-item-training">{tr.title}</p>
              </div>
            </div>:""
            
            ))}
            
          </div>
        </div>
      </div>
    </>
  )
}
