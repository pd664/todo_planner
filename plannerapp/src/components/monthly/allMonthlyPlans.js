import React, { useState } from 'react';
import '../../static/components/todos/allTodo.css';
import { useDispatch, useSelector } from 'react-redux';
import { completedMonthlyPlan, deleteMonthlyPlan } from '../../reduxComps/actions/Index';
// import Todohelper from './Todohelper';
import MonthlyPlanHelper from './MonthlyPlanHelper';
import axios from 'axios';

function AllMonthlyPlans() {
  const dispatch = useDispatch();
  const allMonthlyPlans = useSelector((state) => state.monthlyPlansReducer)
  const allMonthlyPlanServer = useSelector((state) => state.monthlyPlanServerReducer)
  const [display, setDisplay] = useState(-1);
  const [index, setIndex] = useState(-1)

  const handleDone = (id, status) => {
    let newStatus = status === 'COMPLETED' ? "NOT DONE" : "COMPLETED"
console.log("newStatus", newStatus)
    axios.post('/completeMp', {
      mpId: id,
      mpstatus: newStatus,
    })
    .then((res) => dispatch(completedMonthlyPlan(id)))
    .catch(error => console.log(error))
  }

  const handleDelete = (id) => {
      axios.post('/deleteMp', {
        mpId: id
      })
      .then((data) => dispatch(deleteMonthlyPlan(id)))
      .catch((err) => console.log(err))
  }

  const toggleElement = (currentIndex) => {
      setIndex(currentIndex)
      if(currentIndex===display) {
          setDisplay(-1);
      }
      else {
          setDisplay(currentIndex);
      }
    };

  function daysInMonth (date) {
    let month = date.slice(5,7)
    let year = date.slice(0, 4)
    // console.log("month", month, 'year', year,'day', new Date(year, month, 0).getDate())
    console.log('new date', new Date(year, month, 0).getDate())
    return new Date(year, month, 0).getDate();
  }
// console.log(" allMonthlyPlanServer", typeof( allMonthlyPlanServer.mp),  allMonthlyPlanServer.mp)
  return (
    <div className="allTodo">
      <ul>
        { allMonthlyPlanServer.mp && allMonthlyPlanServer.mp.map((monthlyPlan, key) => {
          return ( 
            <li key={key}>
              <div className="todo" >
                <div className="todo_detail" onClick={()=> toggleElement(key)}>
                  <p className="todo_content">
                      {monthlyPlan.monthlyPlanName}
                  </p>
                  <p className="mp_month">
                      {monthlyPlan.monthlyPlanDate}
                  </p>
                </div>
                <div className="todo_status">
                  <div>
                    <button className={monthlyPlan.monthlyPlanStatus == "COMPLETED" ? "status_btn completed_status" : "status_btn not_done"} onClick={() => handleDone(monthlyPlan.monthlyPlanId, monthlyPlan.monthlyPlanStatus)}>{monthlyPlan.monthlyPlanStatus}</button>
                  </div>
                  <div className="">
                    <button className="status_btn delete_status" onClick={() => handleDelete(monthlyPlan.monthlyPlanId)}>Delete</button>
                  </div>
                </div>
              </div>
              {display == key ? <MonthlyPlanHelper days={daysInMonth(monthlyPlan.monthlyPlanDate)} id={monthlyPlan.monthlyPlanId} allMonthlyPlanServer={allMonthlyPlanServer} /> : ""}
            </li> 
          )
        })}
      </ul>
    </div>
  )
}

export default AllMonthlyPlans