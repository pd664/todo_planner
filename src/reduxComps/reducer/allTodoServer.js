const allTodosServer = [];

const todoServerReducer = (state = allTodosServer, action) => {
    // console.log("allTodosServer", allTodosServer)
    // console.log("action.payload.todos ", action)
    switch(action.type) {
        case 'ALLTODOSERVER' : {
            let todos = action.payload.todos 
        
            return [...state,...todos]
        }

        case 'ADDTODO' : {
            console.log("called ode one")
            let obj = {
                todoName: action.payload.todoName,
                userId: action.payload.userId,
                todoId: action.payload.todoId,
                todoNotes : "",
                dueDate : "",
                urgency: "",
                status: "NOT DONE"
                        }
            return [...state, obj]
        }

        case 'COMPLETED': {
            console.log("completeddd state", state)
            return state.map((todo) => {
                if(todo.todoId == action.payload.id) {
                    let a = todo.status == 'COMPLETED' ? "NOT DONE" : "COMPLETED"
                    return {...todo, status: a}
                }
                return todo
            })
        }
        case 'DELETEDTODO': {
            console.log("action.payload.id is", action.payload.id)
            let newState = state.filter(todo => todo.todoId != action.payload.id)
            
            return [...newState];
        }
        default: return state
    }
}

export default todoServerReducer