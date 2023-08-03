const allTodos = []

const todoReducer = (state = allTodos, action) => {
    // console.log(allTodos)
    switch(action.type) {
        case 'ADDTODO' : {
            let obj = {
                content: action.payload.todo,
                id: action.payload.id,
                status: "NOT DONE"
            }
            return [...state, obj]
        }

       

        case 'DELETETODO': {
            let newState = state.filter(todo => todo.id != action.payload.id)
            
            return newState;
        }

        case 'COMPLETE': {
            console.log("complete state", state)
           return state.map((todo) => {
               if(todo.id == action.payload.id) {
                   let a = todo.status == 'COMPLETED' ? "NOT DONE" : "COMPLETED"
                   return {...todo, status: a}
               }
               return todo
           })
        }
        default: return state
    }
}

export default todoReducer