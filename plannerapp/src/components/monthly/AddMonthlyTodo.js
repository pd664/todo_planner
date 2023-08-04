import React, { useState, useEffect } from "react";
import "../../static/components/monthly/addMonthlyTodo.css";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { completedMonthlyPlanTodo, addMonthlyPlanTodo, deleteMonthlyPlanTodo } from '../../reduxComps/actions/Index'

function AddMonthlyTodo(props) {
  const dispatch = useDispatch()
  const { todoDate, id } = props;
  const [ todoOnDate, setTodoOnDate ] = useState([])
  const allMonthlyPlanServer = useSelector((state) => state.monthlyPlanServerReducer)

  let close = document.getElementsByClassName("close");
  // console.log("allMonthlyPlanServer", typeof allMonthlyPlanServer.mp, allMonthlyPlanServer.mp)

  useEffect(() => {
    // axios.post('http://localhost:4000/getMonthlyPlanTodo', {
    //   mpId : id,
    // })
    // .then((res) => {console.log("data is ", res.data.monthlyPlanDaysTodo);
    // //  setTodoOnDate(res.data.monthlyPlanDaysTodo)
    // })
    // .catch((err) => console.log("err is", err))
    let ind  = allMonthlyPlanServer.mp.findIndex((item) => item.monthlyPlanId == id)
    // console.log("ind", ind)
    setTodoOnDate(allMonthlyPlanServer.mp[ind].monthlyPlanDaysTodo)
    // for(const key in allMonthlyPlanServer.mp) {
    //   console.log("mp is ", allMonthlyPlanServer, typeof allMonthlyPlanServer)
    // }
    
}, [])
// console.log("todoOnDate",typeof(todoOnDate) ,todoOnDate)
  
  let ind = todoOnDate && todoOnDate.findIndex((date) => (date[todoDate.toString()]))
  // console.log("ind", ind)
  
  async function newTodo() {
    var mpTodoId = "mpId" + Math.random().toString(16).slice(2)
    await axios.post('/addMPNewTodo', {
      mpId : id,
      mpTodoId: mpTodoId,
      mpTodoDate: todoDate,
      mpNote: document.getElementById('amt_input').value
    })
    .then((res) => {console.log("res.data", res.data.monthlyPlanDaysTodo);
    // setTodoOnDate(res.data.monthlyPlanDaysTodo)
    dispatch(addMonthlyPlanTodo(id, mpTodoId, todoDate, document.getElementById('amt_input').value))
  })
    .catch((err) => console.log("err is", err))

    // let inputValue = document.getElementById('amt_input').value
    
    // let li = document.createElement('li')
    
    // let textnode = document.createTextNode(inputValue)
    // li.id = 'amt_ul_li'
    // // li.onclick = completeMPTodo(mpTodoId)
    // li.appendChild(textnode)

    // if(inputValue == "") {
    //   alert("Add some Todo")
    // }
    // else {
    //   document.getElementById('amt_ul').appendChild(li)
    // }

    // document.getElementById("amt_input").value = ""

    // var span = document.createElement("SPAN");
    // var txt = document.createTextNode("\u00D7");
    // span.classList.add("close")
    // span.appendChild(txt);
    // li.appendChild(span);

    // for (let i = 0; i < close.length; i++) {
    //   close[i].onclick = function() {
    //     var div = this.parentElement;
    //     div.style.display = "none";
    //   }
    // }
    // console.log(close.length)
  }

  function deleteMPTodo(mpTodoId) {
    console.log("called deleteMPTodo")
    axios.post('/deleteMPTodo', {
      mpId: id,
      mpTodoId: mpTodoId,
      date : todoDate.toString()
    }) 
    .then(() => {
      dispatch(deleteMonthlyPlanTodo(id, mpTodoId, todoDate.toString()))
      document.getElementById("amt_input").value = ""
      // for (let i = 0; i < close.length; i++) {
      //   close[i].onclick = function() {
      //     var div = this.parentElement;
      //     div.style.display = "none";
      //   }
      // }
    })
    .catch((err) => console.log(err))
  }

  async function completeMPTodo(mpTodoId, status) {
    let newStatus = status == 'Not Done' ? 'completed' :  'Not Done'
    console.log("called completeMPTodo")
    await axios.post('/statusMPTodo', {
      mpId: id,
      mpTodoId: mpTodoId,
      date : todoDate.toString()
    }) 
    .then(res =>{console.log("result", res); dispatch(completedMonthlyPlanTodo(id, mpTodoId, todoDate.toString(), newStatus))})
    .catch(err => console.log("errr is ", err))
    console.log("completed")
  }

  function checkList(mpId, mpTodoId, mpTodoDate) {
    console.log("checklist")
  }

  return (
    <div className="addMonthlyTodo">
      <h2 style={{margin: "5px"}}>To Do List for {todoDate}</h2>
      <div id="amt_header" className="header">
        <input type="text" id="amt_input" placeholder="Title..." />
        
        <span onClick={() => newTodo()} className="amt_addBtn">
          Add
        </span>
      </div>

      <ul id="amt_ul">
        {ind != -1 && todoOnDate[ind][todoDate.toString()].map((data, i) => {
          // console.log("data.status", data)
          return ( 
            <li key={i} id="amt_ul_li" className={data.status == 'completed' ? 'checked abc' : 'abcd'}><span onClick={() => completeMPTodo(data.mpTodoId, data.status)}>{data.nameOfTodo}</span><span onClick={() => deleteMPTodo(data.mpTodoId)} className="close">*</span></li>
              
          ) 
        })}
      </ul>
    </div>
  );
}

export default AddMonthlyTodo;
