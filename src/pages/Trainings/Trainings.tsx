
import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useNavigate } from 'react-router-dom'
import reset from '../../assets/icons/resetInput.svg'
import search from '../../assets/icons/search.svg'
import arrowDown from '../../assets/icons/arrowDown.svg'
import './Trainings.css'
type UserProfile = {
  user_id: string
  email: string
  full_name: string
  role: 'user' | 'trainer'
  created_at?: string
}
type Props = {
  currentUser:UserProfile
}
export default function Trainings({currentUser}:Props) {
    const navigate = useNavigate()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [usersInput,setUsersInput]=useState('')
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/auth')
      }
    }

    checkAuth()
  }, [navigate])


  const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
  
  if (error) {
    console.error('Ошибка получения пользователей:', error)
    return []
  }
  
  setUsers(data)
}

useEffect(()=>{
    getAllUsers()
},[])
console.log(users)
  const [current,setCurrent]=useState(1)
  return (
   <>
    <div className="trainings">
       
        <div className="trainings__container">
            <div className="trainings__nav">
                <div className="trainings__nav-container">
                    <div onClick={()=>setCurrent(0)} className={`trainings__nav-item ${current==0?'trainings__nav-item--current':""}`}>
                        <p className={`trainings__nav-item-text ${current==0?'trainings__nav-item-text--current':""}`}>Achievments</p>
                    </div>
                    <div onClick={()=>setCurrent(1)} className={`trainings__nav-item ${current==1?'trainings__nav-item--current':""}`}>
                        <p className={`trainings__nav-item-text ${current==1?'trainings__nav-item-text--current':""}`}>Your Trainings</p>
                    </div>
                </div>
            </div>
            <div className="trainings__filters">
                <div className="trainings__filters-container">
                    <div className="trainings__filters-search">
                        
                        <div className="trainings__filters-search-loop">
                            <img className='trainings__filters-search-img' src={search} alt="" />
                        </div>
                        <input value={usersInput} onChange={(e)=>setUsersInput(e.target.value)} placeholder='Search...' className='trainings__filters-search-input' type="text" />
                        <div className="trainings__filters-search-reset">
                            <img className='trainings__filters-search-img' src={reset} alt="" />
                        </div>
                        
                    </div>
                    <div className="trainings__filters-sort">
                        <div className="trainings__filters-sort-container">
                            <p className='trainings__filters-sort-text'>Last added</p>
                            <img className='trainings__filters-sort-img' src={arrowDown} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="trainings__list">
                <div className="trainings__list-container">
                    <div className="trainings__list-main">
                        {users.map(u=>(
                            currentUser.role!=u.role?
                                u.full_name.startsWith(usersInput)?
                            <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                               <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>Beginner</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>{u.full_name}{/*  and {u.role} */}</p>
                                </div>
                            </div>
                        </div>
                    </div>:"":""
                        ))}
                    
                    
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
   </>
  )
}
