import { configureStore } from "@reduxjs/toolkit";
import addTodos from './reducer/addTodos'
import monthlyPlansReducer from './reducer/addMonthlyList'
import todoServerReducer from './reducer/allTodoServer'
import monthlyPlanServerReducer from './reducer/allMonthlyPlanServer'
const store = configureStore({
    reducer : {
        addTodos,
        monthlyPlansReducer,
        todoServerReducer,
        monthlyPlanServerReducer
    }
})

export default store;