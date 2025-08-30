import { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabaseClient';
import './ModalJoin.css'
type Props={
 clickedTraining:string;
setterModalJoin:(bool:boolean)=>void;
}
type UserProfile = {
  user_id: string
  email: string
  full_name: string
  role: 'user' | 'trainer'
  created_at?: string
 
}
interface Training {
  id: number;
  trainer_id: string;
  date: string;
  start_time: string;
  duration: number;
  max_participants: number;
  participants: UserProfile[];
  title: string;
  trainer_data: UserProfile;
  created_at?: string;
}
interface TrainingState {
  training: Training | null;
  loading: boolean;
  error: string | null;
}
export default function ModalJoin({setterModalJoin,clickedTraining}:Props) {
    const addUserToTraining = async () => {
  try {
    // Получаем данные текущего пользователя
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('Пользователь не авторизован');
      return { success: false, message: 'Пользователь не авторизован' };
    }

    // Получаем профиль текущего пользователя
    const { data: userProfile, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (userError) {
      console.error('Ошибка получения профиля пользователя:', userError);
      throw userError;
    }

    if (!userProfile) {
      console.error('Профиль пользователя не найден');
      return { success: false, message: 'Профиль пользователя не найден' };
    }

    // Получаем текущих участников тренировки
    const { data: trainingData, error: fetchError } = await supabase
      .from('trainings')
      .select('participants, max_participants')
      .eq('id', clickedTraining)
      .single();

    if (fetchError) {
      console.error('Ошибка получения тренировки:', fetchError);
      throw fetchError;
    }

    // Проверяем, не является ли пользователь уже участником
    const currentParticipants = trainingData.participants || [];
    const isAlreadyParticipant = currentParticipants.some(
      (participant: UserProfile) => participant.user_id === userId
    );

    if (isAlreadyParticipant) {
      console.log('Пользователь уже является участником этой тренировки');
      return { success: false, message: 'Пользователь уже записан' };
    }

    // Проверяем лимит участников
    if (currentParticipants.length >= trainingData.max_participants) {
      console.log('Достигнут лимит участников');
      return { success: false, message: 'Достигнут лимит участников' };
    }

    // Добавляем объект пользователя в массив участников
    const updatedParticipants = [...currentParticipants, userProfile];

    // Обновляем запись в базе данных
    const { data, error } = await supabase
      .from('trainings')
      .update({ 
        participants: updatedParticipants 
      })
      .eq('id', clickedTraining)
      .select();

    if (error) {
      console.error('Ошибка обновления тренировки:', error);
      throw error;
    }

    console.log('Пользователь добавлен к тренировке:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Ошибка в функции addUserToTraining:', error);
    throw error;
  }
};



  const [trainingState, setTrainingState] = useState<TrainingState>({
    training: null,
    loading: false,
    error: null
  });

  const fetchTrainingById = async () => {
    setTrainingState(prev => ({ ...prev, loading: true, error: null }));

    try {
     
      const { data: trainingData, error: trainingError } = await supabase
        .from('trainings')
        .select('*')
        .eq('id', clickedTraining)
        .single();

      if (trainingError) {
        throw trainingError;
      }

      if (!trainingData) {
        throw new Error('Тренировка не найдена');
      }

      
      let trainerData = trainingData.trainer_data;
      
     
      if (typeof trainingData.trainer_data === 'string' || !trainingData.trainer_data.full_name) {
        const { data: trainerProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', trainingData.trainer_id)
          .single();
        
        trainerData = trainerProfile;
      }

      
      const fullTrainingData: Training = {
        ...trainingData,
        trainer_data: trainerData,
        participants: Array.isArray(trainingData.participants) ? trainingData.participants : []
      };

      setTrainingState({
        training: fullTrainingData,
        loading: false,
        error: null
      });

      return fullTrainingData;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      
      setTrainingState({
        training: null,
        loading: false,
        error: errorMessage
      });
      
      console.error('Ошибка загрузки тренировки:', error);
      throw error;
    }
  };

  
useEffect(()=>{
fetchTrainingById()
},[])
 



  return (
    <>
        <div className="modal-join-outer">
          <div className="modal-join">
        <div className="modal-join__container">
            <div className="modal-join__nav">
                <div className="modal-join__nav__title-outer"><h3 className='modal-join__title'>Join to Session</h3></div>
                <div className="exit-outer"><div onClick={()=>setterModalJoin(false)} className="exit"></div></div>
                
            </div>
            
            <div className="modal-join__info">
                <div className="modal-join__info-item">
                    <p className='modal-join__info-item-text'>Title:</p>
                    <p className='modal-join__info-item-text'>{trainingState.training?.title}</p>
                    
                  </div>
                 <div className="modal-join__info-item">
                    <p className='modal-join__info-item-text'>Trainer:</p>
                    <p className='modal-join__info-item-text'>{trainingState.training?.trainer_data.full_name}</p>
                    
                  </div>
                  <div className="modal-join__info-item">
                    <p className='modal-join__info-item-text'>Date:</p>
                    <p className='modal-join__info-item-text'>{trainingState.training?.date}</p>
                    
                  </div>
                 <div className="modal-join__info-item">
                    <p className='modal-join__info-item-text'>Time:</p>
                    <p className='modal-join__info-item-text'>{trainingState.training?.start_time}</p>
                    
                  </div>
                 
                  <div className="modal-join__info-item">
                    <p className='modal-join__info-item-text'>Duration:</p>
                    <p className='modal-join__info-item-text'>{trainingState.training?.duration} min</p>
                    
                  </div>
                  <div className="modal-join__info-item">
                    <p className='modal-join__info-item-text'>Participants:</p>
                    <p className='modal-join__info-item-text'>{trainingState.training?.participants.length}/{trainingState.training?.max_participants}0</p>
                    
                  </div>
                    
                </div>
                
            
            <div className="modal-add__button">
                <button onClick={addUserToTraining} className="modal-add__button-container">Join to Session</button>
            </div>

        </div>
    </div>
    </div>
    </>
  )
}
