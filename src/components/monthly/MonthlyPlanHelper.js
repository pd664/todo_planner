import React, { useEffect, useState } from 'react';
import '../../static/components/monthly/monthlyPlanHelper.css'
// import {date, daysName, setdate} from './DaysAndDate'
import AddMonthlyTodo from './AddMonthlyTodo';

function MonthlyPlanHelper(props) {
  const {days, id, allMonthlyPlanServer} = props
  const [todoFor, setTodoFor] = useState("today")
  const [display, setDisplay] = useState(-1);
  const [index, setIndex] = useState(0);
  const [num, setNum] = useState(0);

  useEffect(() => {
    daysName()
  },[])

  const arr = new Array(days);
  arr.fill(0)
  let setI = 0

  // console.log("display", display)
  
    const daysName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
    const container = document.getElementById("days_name");
    for(let i = 0; i < days.length; i++) {
      const day = document.createElement("h4")
      day.classList.add('item', 'dayname')
      day.innerHTML += days[i]
      container.appendChild(day);
    }
  }

  function toggleElement(currentIndex) {
    setTodoFor(currentIndex)
    if(currentIndex === display) {
        setDisplay(-1);
    }
    else {
        setDisplay(currentIndex);
    }
  };

  const todayDate = new Date().getDate();

  return (
    <div className="monthlyPlanHelper">
      {/* <div id="days_name"></div> */}
      <div id="mph_cont">
        <div id="days_name"></div>
        <div className="dates">
        {arr.map((each, i) => {
          {setI = i < 31 ? i : i - 31}
          return (
            <div className={(i.toString() == todayDate-1) ? (`date_today item`) :"item"}  key={i} >
              <a className={`item-${i} ${i >= days ? "unclickable" : ""}`} onClick={() => toggleElement(i+1)}>
                <div id="dat">{setI+1}</div>
                {/* <div id="notes_comp"></div> */}
              </a>
              <div className="todo_note">
                  {display == i ? <AddMonthlyTodo allMonthlyPlanServer={allMonthlyPlanServer} todoDate={todoFor} id={id} /> : ""}
              </div>
            </div>
          )
        }       
        )}
        </div>
      </div>
    </div>
  )
}

export default MonthlyPlanHelper

//   const [todoFor, setTodoFor] = useState("today")
//   const [display, setDisplay] = useState(-1);
//   const [index, setIndex] = useState(0);
//   const [num, setNum] = useState(0);

//   useEffect(() => {
//     daysName()
//     date(todoDate)
//   },[])
// console.log("dispaly", display, index)
//   function todoDate(event) {
//     let date = ""
//     // console.log("event", event.target.innerText)
//     // setdate = event.target.innerText
//     setTodoFor(event.target.innerText)
//     // console.log("class",  event.target.classList[2]) 
//     setIndex(event.target.classList[2])
//     toggleElement (event.target.innerText)
//     shownotes()
//   }

//    const date = (todoDate) => {
//     const container = document.getElementById("mph_cont");
//     const todayDate = new Date().getDate();
//     // console.log(todayDate)
//     const notes = document.getElementById('notes_cont')

//     for (let i = 1; i < 36; i++) {
//       const item = document.createElement("a");
//       if(i.toString() == todayDate) item.classList.add("date_today")

//       item.classList.add("item", "item-" + i, i);
//       let setI = i < 32 ? i : i - 31

//       item.innerHTML = 
//       `<div id="dat">${setI}</div>
//       <div id="notes_comp"></div` 
       
//       item.onclick = todoDate
//       container.appendChild(item);
//     }
//   }

//   function shownotes() {
//     let notes = document.getElementById('notes_comp')
//     notes.innerHTML = display == index ? <AddMonthlyTodo todoDate={todoFor} /> : ""
    
//   }

//   const daysName = () => {
//     const days = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
//     const container = document.getElementById("mph_cont");
//     for(let i = 0; i < days.length; i++) {
//       const day = document.createElement("h3")
//       day.classList.add('item', 'dayname')
//       day.innerHTML = days[i]
//       container.appendChild(day);
//     }
//   }

//   const toggleElement = (currentIndex) => {
// // console.log("current", currentIndex)
   
//     if(currentIndex === display) {
//         setDisplay(-1);
//     }
//     else {
//         setDisplay(currentIndex);
//     }
//   };

//   const days = {
//       31: ['january', 'march', 'may', 'july', 'august', 'october', 'december'],
//       30: ['april', 'june', 'september', 'november'],
//       28: ['february']
//   }
// let count = 0
//   return (
//     <div className="monthlyPlanHelper">
//       <div id="mph_cont">
        
//       </div>
//       <div className="notes">
//         <div id="notes_cont">
//         {/* <h2>To do {todoFor}</h2> */}
//         {/* {display == index ? <AddMonthlyTodo todoDate={todoFor} /> : ""} */}

//         </div>
//       </div>
//     </div>
//   )