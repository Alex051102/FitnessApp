import { useEffect, useState } from 'react';
import './Calendar.css'
type Props={
  
  setterDate:(day:number,month:number)=>void
}
export default function Calendar({setterDate}:Props) {
    
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const calendar = [
  { 
    month: "January",
    daysArray: ["", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  },
  { 
    month: "February",
    daysArray: ["", "", "", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
  },
  { 
    month: "March",
    daysArray: ["", "", "", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  },
  {
    month: "April",
    daysArray: ["", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
  },
  { 
    month: "May",
    daysArray: ["", "", "", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  },
  {
    month: "June",
    daysArray: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
  },
  { 
    month: "July",
    daysArray: ["", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  },
  { 
    month: "August",
    daysArray: ["", "", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  },
  { 
    month: "September",
    daysArray: ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
  },
  { 
    month: "October",
    daysArray: ["", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  },
  { 
    month: "November",
    daysArray: ["", "", "", "", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
  },
  { 
    month: "December",
    daysArray: ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  }
];
const [currentMonth,setCurrentMonth]=useState(0)
const [currentDay,setCurrentDay]=useState('1')

useEffect(()=>{
  setterDate(currentMonth+1,Number(currentDay))
},[currentDay,currentMonth])
  return (
    <>
        <div className="calendar">
            <div className="calendar__container">
                <div className="calendar__months">

                    {months.map((m,ind)=>(
 <div onClick={()=>{setCurrentMonth(ind); setCurrentDay('1')}} className={`calendar__month ${ind==currentMonth?'calendar__month--current':""}`}>
                        <p className={`calendar__month-text ${ind==currentMonth?'calendar__month-text--current':""}`}>{m}</p>
                    </div>
                    ))}
                   
                </div>
                <div className="calendar__daysWeek">
                    {daysOfWeek.map((d)=>(
                        <div className="calendar__dayWeek">
                            <p className="calendar__dayWeek-text">{d}</p>
                        </div>
                    ))}
                </div>
                <div className="calendar__days">
                    {calendar[currentMonth].daysArray.map((c)=>(
                     
                        <div className="calendar__day">
                            <div onClick={()=>setCurrentDay(c)} className={`calendar__day-container ${c==currentDay?'calendar__day-container--current':""}`}>
                                <p className={`calendar__day-text ${c==currentDay?'calendar__day-text--current':""}`}>
                                    {c}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}
