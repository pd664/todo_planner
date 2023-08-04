import React, { useState } from 'react';
import '../../static/components/todos/allTodo.css';
import { useDispatch, useSelector } from 'react-redux';
import { completed } from '../../reduxComps/actions/Index';
import Todohelper from './Todohelper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUser } from '../../utils/token'

function AllTodo() {
  let userId = getUser();
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.addTodos)
  const allTodosServer = useSelector((state) => 
    // console.log("sate is ", state.todoServerReducer)
    state.todoServerReducer
  
  )
  const [display, setDisplay] = useState(-1);
  const [index, setIndex] = useState(-1)

  const handleDone = (id, status) => {
    let newStatus = status === 'COMPLETED' ? "NOT DONE" : "COMPLETED"
    console.log("newStatus", newStatus)
    // console.log("id", id)
      axios.post('/complete', {
        postId: id,
        userId: userId.userId,
        status: newStatus
      })
      .then((res) => {
        console.log("res", res)
        if(res.status === 200) {
          console.log("res.status", res.status)
          return dispatch(completed(id))
        }
      })
      .catch((err) => console.log("err", err))
  }

  const handleDelete = (id) => {
      axios.post('/delete', {
        postId: id
      })
      .then((res) => {
        if(res.status === 200) {
          return dispatch({
            type: 'DELETEDTODO',
            payload: {
                id: id
            }
        })
        }
      })
      .catch((err) => console.log("new err is", err))
  }
// console.log("allTodosServer are",  allTodosServer)
  const toggleElement = (currentIndex) => {
      setIndex(currentIndex)
      if(currentIndex===display) {
          setDisplay(-1);
      }
      else {
          setDisplay(currentIndex);
      }
    };

  return (
    <div className="allTodo">
      <ul>
        {allTodosServer && allTodosServer.map((todo, key) => {
          return ( 
            <li key={key}>
              <div className="todo" >
                <div className="todo_detail" onClick={()=> toggleElement(key)}>
                <p className="todo_content">
                  {todo.todoName}
                </p>
                </div>
                <div className="todo_status">
                  <div>
                    <button className={todo.status == "COMPLETED" ? "status_btn completed_status" : "status_btn not_done"} onClick={() => handleDone(todo.todoId)}>{todo.status}</button>
                  </div>
                  <div className="">
                    <button className="status_btn delete_status" onClick={() => handleDelete(todo.todoId)}>Delete</button>
                  </div>
                </div>
              </div>
              {display == key ? <Todohelper key={display} note={todo.todoNotes} date={todo.dueDate} todoId={todo.todoId} urgent={todo.urgency} /> : ""}
            </li> 
          )
        })}
      </ul>
    </div>
  )
}

export default AllTodo