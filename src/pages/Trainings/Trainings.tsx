import React from 'react'
import { useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useNavigate } from 'react-router-dom'
import reset from '../../assets/icons/resetInput.svg'
import search from '../../assets/icons/search.svg'
import arrowDown from '../../assets/icons/arrowDown.svg'
import './Trainings.css'
export default function Trainings() {
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
    <div className="trainings">
        <div className="trainings__container">
            <div className="trainings__nav">
                <div className="trainings__nav-container">
                    <div className="trainings__nav-item">
                        <p className='trainings__nav-item-text'>Achievments</p>
                    </div>
                    <div className="trainings__nav-item">
                        <p className='trainings__nav-item-text'>Your Trainings</p>
                    </div>
                </div>
            </div>
            <div className="trainings__filters">
                <div className="trainings__filters-container">
                    <div className="trainings__filters-search">
                        
                        <div className="trainings__filters-search-loop">
                            <img className='trainings__filters-search-img' src={search} alt="" />
                        </div>
                        <input placeholder='Search...' className='trainings__filters-search-input' type="text" />
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
                        <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                               <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>Beginner</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>Alex Jackson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                                <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>Beginner</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>Alex Jackson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                               <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>Beginner</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>Alex Jackson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                                <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>Beginner</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>Alex Jackson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                               <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>Beginner</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>Alex Jackson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                                <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>Beginner</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>Alex Jackson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                               <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>Beginner</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>Alex Jackson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                                <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>Beginner</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>Alex Jackson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                               <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>Beginner</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>Alex Jackson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trainings__list-item">
                        <div className="iconn"></div>
                        <div className="trainings__list-item-info">
                            <h3 className='trainings__list-item-name'>Running</h3>
                            <div className="trainings__list-item-down">
                                <div className="trainings__list-item-level-outer">
                                    <p className='trainings__list-item-level'>enddddd</p>
                                </div>
                                <div className="trainings__list-item-trainer-outer">
                                    <p className='trainings__list-item-trainer'>Alex Jackson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
   </>
  )
}
