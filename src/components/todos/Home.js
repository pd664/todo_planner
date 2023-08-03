import React, {useState} from 'react'
import AddTodo from './AddTodo'
import AllTodo from './AllTodo';
import $ from "jquery";

function Home() {

  return (
    <div className="home">
    <AddTodo />
    <AllTodo />
  </div>
  )
}

export default Home