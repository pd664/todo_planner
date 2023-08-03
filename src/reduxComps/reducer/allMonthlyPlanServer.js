const allMonthlyPlanServer = [];

const monthlyPlanServerReducer = (state = allMonthlyPlanServer, action) => {
    // console.log("allTodosServer", allTodosServer)
    // console.log("action.payload.todos ", action)
    switch(action.type) {
        case 'ALLMONTHLYPLANSERVER' : {
            let monthlyPlans = action.payload.monthlyPlans 
            // console.log([action.payload, ...monthlyPlans])
            return {...state, mp: [...monthlyPlans]}
        }

        case 'ADDMONTHLYPLAN' : {
            console.log("called ADDMONTHLYPLAN")
            let obj = {
                monthlyPlanName: action.payload.mPName,
                monthlyPlanDate: action.payload.mpDate,
                monthlyPlanId: action.payload.mpId,
                monthlyPlanUserId: action.payload.userId,
                monthlyPlanStatus: "NOT DONE",
                monthlyPlanDaysTodo: []
            }
            return {...state, mp: [...state.mp, obj]}
        }

        case 'COMPLETEDMONTHLYPLAN': {
            console.log("completeddd state",typeof state)
            let mpId = action.payload.mpId
            let index = state.mp.findIndex(mp => mp.monthlyPlanId === mpId)
            const newArray = [...state.mp]
            let newStatus = newArray[index].monthlyPlanStatus == 'COMPLETED' ? "NOT DONE" : "COMPLETED"

            newArray[index].monthlyPlanStatus = newStatus
            return { 
                ...state, //copying the orignal state
                mp: newArray, //reassingning todos to new array
               }
            // let a = state[ind].monthlyPlanStatus == 'COMPLETED' ? "NOT DONE" : "COMPLETED"
            // state[ind].monthlyPlanStatus = a 
            // return {...state} 
            // console.log("ind", ind)  
            // return state.mp.map((mp) => { 
            //     console.log("mp", (mp.monthlyPlanId), (action.payload.mpId)) 
            //     if(mp.monthlyPlanId.toString() === action.payload.mpId.toString()) {
            //         console.log("mp.monthlyPlanStatus", mp)
            //         let newStatus = mp.monthlyPlanStatus == 'COMPLETED' ? "NOT DONE" : "COMPLETED"
            //         return {...mp, monthlyPlanStatus: newStatus}
            //     }
            //     return mp
            // })
        }

        case 'DELETEMONTHLYPLAN': {
            return {  // returning a copy of orignal state
                ...state, //copying the original state
                mp: state.mp.filter(mp => mp.monthlyPlanId !== action.payload.mpId) 
            }
        }

        case 'COMPLETEDMONTHLYPLANTODO': {
            let index = state.mp.findIndex(mp => mp.monthlyPlanId === action.payload.mpId)
            let newArray = [...state.mp]
console.log("index", index, newArray)
            let indexOfdate = (newArray[index].monthlyPlanDaysTodo)
console.log("indexOfdate", typeof indexOfdate, indexOfdate[action.payload.mpTodoDate], action.payload.mpTodoDate)
let a = indexOfdate.findIndex(data => data[action.payload.mpTodoDate])
console.log("a", a)
                if(a != -1) {
                    console.log("yesssssssssssssssssssss",typeof newArray[index].monthlyPlanDaysTodo[a], newArray[index].monthlyPlanDaysTodo[a])
                    // ind = i
                    // console.log("iiiiiiiiiiiiiiii", i)
                    let todoIndex = newArray[index].monthlyPlanDaysTodo[a][action.payload.mpTodoDate].findIndex((todo) => todo.mpTodoId === action.payload.mpTodoId)
                    console.log("indaaaaaaaaaaaa", todoIndex)

                    // let todoIndex = newArray[index].monthlyPlanDaysTodo[a].findIndex((todo) => todo.mpTodoId === action.payload.mpTodoId)
                    // console.log("todoIndex", newArray[index].monthlyPlanDaysTodo[a][todoIndex].status, newArray[index].monthlyPlanDaysTodo[a][todoIndex].nameOfTodo)
                    let newStatus = newArray[index].monthlyPlanDaysTodo[a][action.payload.mpTodoDate][todoIndex].status == "Not done" ? 'completed' : "Not done"
                    console.log("status", newArray[index].monthlyPlanDaysTodo[a][action.payload.mpTodoDate][todoIndex].status)
                    newArray[index].monthlyPlanDaysTodo[a][action.payload.mpTodoDate][todoIndex].status = newStatus

                }   
                console.log("newArraty", newArray)
                return {...state, mp: newArray}
        }

        case 'ADDMONTHLYPLANTODO' : {
            console.log("yes called", state)
            let mpId = action.payload.mpId
            let mpTodoDate = action.payload.mpTodoDate
            let mpNote  = action.payload.mpNote
            let mpTodoId = action.payload.mpTodoId
console.log(mpId, mpTodoDate, mpNote, mpTodoId)
            let temp = {}
            temp[mpTodoDate] = [{mpTodoId : mpTodoId, nameOfTodo : mpNote, status: 'Not done'}]

            let obj = {
                mpTodoId: mpTodoId, nameOfTodo : mpNote, status: 'Not done'
            }
            console.log("mpTodoDate", mpTodoDate)
            let index = state.mp.findIndex(mp => mp.monthlyPlanId === mpId)
            let doc = state.mp[index]
            console.log("doc", doc.monthlyPlanDaysTodo)

            let dateind = doc.monthlyPlanDaysTodo.findIndex((date) => (date[mpTodoDate]))
            console.log("ind", dateind)
            if(dateind !== -1 ) {console.log("pushing"); doc.monthlyPlanDaysTodo[dateind][mpTodoDate].push(obj)}
            else doc.monthlyPlanDaysTodo.push(temp)
            return {...state, ...doc};
        }

        case 'DELETEMONTHLYPLANTODO' : {
            let mpId = action.payload.mpId
            let mpTodoId = action.payload.mpTodoId
            let mpTodoDate  = action.payload.date

            let index = state.mp.findIndex(mp => mp.monthlyPlanId === mpId)
            let doc = state.mp[index]
            let dateind = doc.monthlyPlanDaysTodo.findIndex((date) => (date[mpTodoDate]))
            let todoInd = doc.monthlyPlanDaysTodo[dateind][[mpTodoDate.toString()]].findIndex((todo) => (todo.mpTodoId == mpTodoId))
            doc.monthlyPlanDaysTodo[dateind][[mpTodoDate.toString()]].splice(todoInd, 1)

            // let newState = doc.monthlyPlanDaysTodo[dateind][[mpTodoDate.toString()]].filter((todo) => (todo.mpTodoId == mpTodoId))
            // console.log("newState", newState)
            return {...state};

        }
        
        default: return state
    }
}

export default monthlyPlanServerReducer