var id = "id" + Math.random().toString(16).slice(2)

export const addTodos = (todoName, userId, todoId) => {
    // var id = "id" + Math.random().toString(16).slice(2)
    return {
        type: 'ADDTODO',
        payload: {
            todoName: todoName,
            todoId: todoId,
            userId: userId 
        }
    }
}

// export const addOneTodos = (todo) => {
//     console.log("todos are", todo)
//     var id = "id" + Math.random().toString(16).slice(2)
//     return {
//         type: 'ADDTODO',
//         payload: {
//             todo: todo,
//             id: id
//         }
//     }
// }

export const allTodosServer = (arr) => {
    // console.log("action is", arr)
    return {
        type : 'ALLTODOSERVER',
        payload: {
            todos: arr
        }
    }
}



export const deleteTodo = (id) => {
    return {
        type: 'DELETETODO',
        payload: {
            id: id
        }
    }
}

export const completed = (id) => {
    return{
        type: 'COMPLETED',
        payload: {
            id: id
        }
    }
}

export const allMonthlyServer = (arr) => {
    // console.log("action is", arr)
    return {
        type : 'ALLMONTHLYPLANSERVER',
        payload: {
            monthlyPlans: arr
        }
    }
}

export const addMonthlyPlan = (mPName, mpDate, id, userId) => {
    var id = "id" + Math.random().toString(16).slice(2)
    return {
        type: 'ADDMONTHLYPLAN',
        payload: {  
            mPName: mPName,
            mpDate: mpDate,
            mpId: id,
            userId: userId
        }
    }
}

export const deleteMonthlyPlan = (id) => {
    console.log("called deleteMonthlyPlan")
    return {
        type: 'DELETEMONTHLYPLAN',
        payload: {
            mpId: id
        }
    }
}

export const completedMonthlyPlan = (id) => {
    return{
        type: 'COMPLETEDMONTHLYPLAN',
        payload: {
            mpId: id
        }
    }
}

export const completedMonthlyPlanTodo = (id,mpTodoId, todoDate, newStatus) => {
    // console.log("todoDate.toString()")
    return{
        type: 'COMPLETEDMONTHLYPLANTODO',
        payload: {
            mpId: id,
            mpTodoId:mpTodoId,
            mpTodoDate:todoDate,
            newStatus:newStatus
        }
    }
}

export const addMonthlyPlanTodo = (id, mpTodoId, mpTodoDate, mpNote) => {
    console.log("called addMonthlyPlanTodo")
    console.log(id, mpTodoId, mpTodoDate, mpNote)

    return { 
        type: 'ADDMONTHLYPLANTODO',
        payload: {
            mpId : id,
            mpTodoId: mpTodoId,
            mpTodoDate: mpTodoDate,
            mpNote: mpNote
        }
    }
}

export const deleteMonthlyPlanTodo = (mpId, mpTodoId, date) => {
    return {
        type: 'DELETEMONTHLYPLANTODO',
        payload: {
            mpId: mpId,
            mpTodoId: mpTodoId,
            date : date
        }
    }
}