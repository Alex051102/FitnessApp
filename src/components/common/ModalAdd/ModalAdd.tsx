import { useState } from 'react'
import './ModalAdd.css'
import { supabase } from '../../../services/supabaseClient';
type Props={
    setterModal:(bool:boolean)=>void
    date:number[]
    currentUser:UserProfile
}
type UserProfile = {
  user_id: string
  email: string
  full_name: string
  role: 'user' | 'trainer'
  created_at?: string
 
}
export interface TrainingData {
  
  trainer_id: string;
  title: string;
  date: string;
  start_time: string;
  duration: number;
  max_participants: number;
  participants: UserProfile[];
 
  trainer_data:UserProfile
}
export default function ModalAdd({setterModal,date,currentUser}:Props) {
    const [hour,setHour]=useState('')
    const [minute,setMinute]=useState('')
     const [hourDuration,setHourDuration]=useState('')
    const [minuteDuration,setMinuteDuration]=useState('')
    const [training,setTraining]=useState('')
    const [participants,setParticipants]=useState(10)
    const hoursAndMinutesToTotalMinutes = (hoursStr: string, minutesStr: string): number => {
 
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  
  
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error('Часы и минуты должны быть числами');
  }
  
  if (hours < 0) {
    throw new Error('Часы не могут быть отрицательными');
  }
  
  if (minutes < 0 || minutes >= 60) {
    throw new Error('Минуты должны быть в диапазоне от 0 до 59');
  }
  
 
  return hours * 60 + minutes;
};
    const addTraining = async (trainingData: TrainingData) => {
  try {
    const { data, error } = await supabase 
      .from('trainings')
      .insert([{
        trainer_id: localStorage.getItem('user_id'),
        date: trainingData.date,
        start_time: trainingData.start_time,
        duration: trainingData.duration,
        max_participants: trainingData.max_participants,
        participants: trainingData.participants || [] ,
        title: trainingData.title, 
        trainer_data:trainingData.trainer_data
      }])
      .select() 

    if (error) {
      console.error('Ошибка создания тренировки:', error)
      throw error
    }

    console.log('Тренировка создана:', data)
    return data
    
  } catch (error) {
    console.error('Ошибка в функции addTraining:', error)
    throw error
  }
}
function normalizeDate(){
    
    const day = date[0] < 10 ? `0${date[0]}` : `${date[0]}`;
    const month = date[1] < 10 ? `0${date[1]}` : `${date[1]}`;
    return `${day}-${month}`;
}
const createNewTraining = async () => { if (!currentUser.user_id) {
      console.error('Ошибка: user_id пустой');
      alert('Ошибка: пользователь не авторизован');
      return;
    }const formattedHour = hour.padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');
    const formattedStartTime = `${formattedHour}:${formattedMinute}`;

  try {
    const newTraining = {
      trainer_id: currentUser.user_id, 
      date: `2025-${normalizeDate()}`,
      start_time: formattedStartTime,
      duration: hoursAndMinutesToTotalMinutes(hourDuration,minuteDuration),
      max_participants: participants,
      participants: [] ,
      title: training, 
      trainer_data:currentUser
    }

    const createdTraining = await addTraining(newTraining)
    console.log('Созданная тренировка:', createdTraining)
    
  } catch (error) {
    console.error('Не удалось создать тренировку:', error)
  }
}
  return (
    <>
    <div className="modal-add-outer">
          <div className="modal-add">
        <div className="modal-add__container">
            <div className="modal-add__nav">
                <div className="modal-add__nav__title-outer"><h3 className='modal-add__title'>New Session</h3></div>
                <div className="exit-outer"><div onClick={()=>setterModal(false)} className="exit"></div></div>
                
            </div>
            
            <div className="modal-add__info">
                <div className="modal-add__info-item">
                    <p className='modal-add__info-item-text'>Time:</p>
                    <div className="modal-add__info-item-time-all">
                        <div className="modal-add__info-item-time">
                        <input value={hour} onChange={(e)=>Number(e.target.value)<25?setHour(e.target.value):""} className="modal-add__info-item-time-input" type="text" />
                        <p className="modal-add__info-item-time-end">hr</p>
                    </div>
                    <div className="modal-add__info-item-time">
                        <input value={minute} onChange={(e)=>Number(e.target.value)<60?setMinute(e.target.value):""} className="modal-add__info-item-time-input" type="text" />
                        <p className="modal-add__info-item-time-end">min</p>
                    </div>
                    </div>
                    
                </div>
                <div className="modal-add__info-item">
                    <p className='modal-add__info-item-text'>Duration:</p>
                    <div className="modal-add__info-item-time-all">
                        <div className="modal-add__info-item-time">
                        <input value={hourDuration} onChange={(e)=>Number(e.target.value)<12?setHourDuration(e.target.value):""} className="modal-add__info-item-time-input" type="text" />
                        <p className="modal-add__info-item-time-end">hr</p>
                    </div>
                    <div className="modal-add__info-item-time">
                        <input value={minuteDuration} onChange={(e)=>Number(e.target.value)<60?setMinuteDuration(e.target.value):""} className="modal-add__info-item-time-input" type="text" />
                        <p className="modal-add__info-item-time-end">min</p>
                    </div>
                    </div>
                    
                </div>
                <div className="modal-add__info-item">
                    <p className='modal-add__info-item-text'>Training:</p>
                    <input value={training} onChange={(e)=>setTraining(e.target.value)} className='modal-add__info-item-input' type="text" name="" id="" />
                </div>
                 <div className="modal-add__info-item">
                    <p className='modal-add__info-item-text'>Max Participants:</p>
                    <div className="modal-add__info-item-number">
                        <div onClick={()=>participants>0?setParticipants(c=>c-1):""} className="modal-add__info-item-number-action"><p className="modal-add__info-item-number-action-text">-</p></div>
                        <p  className="modal-add__info-item-number-text">{participants}</p>
                        <div onClick={()=>participants<100?setParticipants(c=>c+1):""} className="modal-add__info-item-number-action"><p className="modal-add__info-item-number-action-text">+</p></div>
                    </div>
                </div>
            </div>
            <div className="modal-add__button">
                <button onClick={createNewTraining} className="modal-add__button-container">Add Session</button>
            </div>

        </div>
    </div>
    </div>
  
    </>
  )
}
