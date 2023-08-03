import React, { useState } from 'react';
import '../../static/components/todos/todoHelper.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getUser } from '../../utils/token'

function Todohelper(props) {
  const {note, date, todoId, urgent} = props
  const dispatch = useDispatch();
  const [notes, setNotes] = useState(note)
  const [dueDate, setDueDate] = useState(date)
  const [urgency, setUrgency] = useState(urgent)

  const saveTodo = async () => {
    await axios.post('http://localhost:4000/updateTodoInfo', {
      userId: getUser().userId,
      todoId: todoId,
      todoNotes : notes,
      dueDate : dueDate,
      urgency: urgency
    })

    .then((res) => {
      console.log("res", res)
      setNotes("")
      setDueDate("")
      setUrgency("")
    })
    .catch((err) => console.log("err", err))
  }

  // const saveTodoNotes = (id) => {

  //   return dispatch({
  //     type: 'SAVETODONOTE',
  //     payload: {
  //         note: note
  //     }
  //   });
  // };
  let newDate = new Date();

  let todayDate = newDate.toISOString().split("T")[0]

  function tommorowDate() {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  }
console.log("dueDate", dueDate)
  return (
    <div className="todohelper">
        <div className="todohelper_cont">
          <div className="todohelper_left">
            <p className="todohelper_left_heading">Notes</p>
            <textarea className="todo_notes" placeholder="Enter your notes" onChange={(e) => setNotes(e.target.value)}>{notes}</textarea>
            
          </div> 

          <div className="todohelper_right">
            
            <div className="due_date">
              <p className="todohelper_left_heading">Due Date</p>
                <div className="due_date_btns">
                  <button className={`due_date_btn due_date_today ${date == todayDate ? 'today' : ""} ${dueDate == todayDate ? 'today' : ""}`}  onClick={() => setDueDate(todayDate)}>Today</button>
                  <button className={`due_date_btn due_date_tomorrow ${date == tommorowDate() ? 'tomorrow' : ""} ${dueDate == tommorowDate() ? 'tomorrow' : ""}`} onClick={() => setDueDate(tommorowDate)}>Tommorow</button>
                  <input type="date" className="due_date_btn todohelper_right_date" min={new Date().toISOString().split("T")[0]} onChange={(e) => setDueDate(e.target.value)} value={dueDate}></input>
                </div>
            </div>
            
            <div className="priority">
            {/* <label for="urgency">Choose urgency:</label> */}
              <select name="urgency" className={`prior ${urgency == 'low' ? 'low' : (urgency == 'medium' ? 'medium' : (urgency == 'high'? 'high' : ""))}`} onChange={(e) => setUrgency(e.target.value)}>
                <option value="">{urgency ? urgency : "--Choose urgency--"}</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="todohelper_btns">
              <button className="todohelper_save" onClick={saveTodo}>SAVE</button>
              <button className="todohelper_delete">DELETE</button>
            </div>
            
          </div>
       </div>
    </div>
  )
}

export default Todohelper