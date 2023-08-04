const mongoose = require('mongoose')

const addTodoSchema = mongoose.Schema({
    userId : { type: String, required: true },
    todoId : { type: String, required: true },
    todoName : { type: String, required: true },
    todoNotes : { type: String },
    dueDate : { type: String },
    urgency : { type: String },
    status : { type: String, default: "NOT DONE"}
})

module.exports = mongoose.model("todoList", addTodoSchema)