import React, { useState } from 'react'
import AllTodo from '../todos/AllTodo';
import AllMonthlyPlans from '../monthly/allMonthlyPlans';

function All() {

  return (
    <div>
      <h4>Todos</h4>
      <AllTodo />
      <h4>Monthly Plans</h4>
      <AllMonthlyPlans />
    </div>
  )
}

export default All