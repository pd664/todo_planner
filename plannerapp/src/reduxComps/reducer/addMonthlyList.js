const monthlyPlans = []

const monthlyPlansReducer = (state = monthlyPlans, action) => {
    switch(action.type) {
        case 'ADDMONTHLYPLAN' : {
            let obj = {
                listname: action.payload.plan,
                month: action.payload.month,
                id: action.payload.id,
                status: "NOT DONE"
            }
            return [...state, obj]
        }

        case 'DELETEMONTHLYPLAN': {
            let newState = state.filter(list => list.id != action.payload.id)
            return newState;
        }

        case 'COMPLETE': {
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

export default monthlyPlansReducer