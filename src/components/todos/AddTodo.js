import React, {useState} from 'react';
import '../../static/components/todos/home.css'
import { useDispatch, useSelector } from 'react-redux';
import { addTodos } from '../../reduxComps/actions/Index'
import { getToken, getUser } from '../../utils/token'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Home() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [todoName, setTodoName] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    var id = "id" + Math.random().toString(16).slice(2)

    if(getToken() !== null) {
      await axios.post('http://localhost:4000/addTodo', {
      todoName: todoName,
      userId: getUser().userId,
      todoId: id,
      todoNotes : "",
      dueDate : "",
      urgency: ""
    })

    .then((res) => {
      if(res.status == 200) {
        console.log("res", res)
        dispatch(addTodos(todoName, getUser().userId), id)
      }
    })
    .catch((err) => console.log("err", err))
      
    }

    else {
      navigate('/signin')
    }
    document.getElementsByName("todo_input")[0].reset();
  }

  return (
    <div className="home">
        <div className="home_todo">
            <h2>Todo List</h2>
            <div className="add_todo">
                {/* <p>Add Todo</p> */}
                <form name="todo_input">
                  <input type="text" className='addTodo'  onChange={(e) => setTodoName(e.target.value)} placeholder="Create new Todo"></input>
                  <input type="submit" className="submitTodo" value="Submit" onClick={handleSubmit}></input> 
                </form>
            </div>
        </div>
    </div>
  )
}

export default Home