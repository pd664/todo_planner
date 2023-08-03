const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const utils = require('./utils');
const signupRoute = require('./routes/signup');
const mongoConnect = require('./mongoConnect');
const SignUpSchema = require("./schema/credentilasSchema");
const AddTodoSchema = require('./schema/addTodoSchema');
const emailValidator = require("deep-email-validator");
const MonthlyPlanSchema = require('./schema/addMonthlyPlanSchema');
const { Console } = require('console');
const PORT = 4000
const http = require('http').Server(app);
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
mongoConnect.mongoConnect()

async function isEmailValid(email) {
  return emailValidator.validate(email)
}

app.post('/signup', async (req, res) => {
  console.log("yes/signup")
  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  if (!name || !email || !username || !password) {
    console.log("please enter all credentials")
    res.send("please enter all credentials");
  }
    
  const { valid, reason, validators } = await isEmailValid(email);
console.log(valid)
  if (valid) {
    console.log("inside")
      const signup = new SignUpSchema({
          name: name,
          username:username,
          password: password,
          email: email
        });
      
        SignUpSchema.findOne({ username: username, email: email}).then((err, data) => {
          console.log("data", data)
          if (err) {
            console.log("err", err)
            return res.status(400).json({
              error: true,
              message: err,
            });
          } else if (data) {
            console.log("Username already taken");
            return res.status(400).json({
              error: true,
              message: "Username already taken",
            });
          } else if (!data || data === undefined) {
            signup.save();
            console.log("Account created successfully");
            return res.status(200).json({
              error: false,
              message: "Account created successfully",
            });
          } else {
            console.log("Invalid Email address.");
            return res.status(400).json({
              error: true,
              message: `Please provide a valid email address, ${validators[reason].reason}`,
            });
          }
        })
  }
})

app.post('/signin', (req, res) => {
  console.log('signin')
  let user = req.body.username;
  let pwd = req.body.password;
// console.log(user, pwd)
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Please enter all details",
    });
  };

  SignUpSchema.findOne({ username: user}).then((data) => {
    // console.log("data", data)
    
    if (data.length != 0) {
      // console.log("data",data);
      // data.map((row) => {
        let a = bcrypt.compareSync(pwd, data.password);
// console.log("a is ",a)
        if (a === true) {
          const token = utils.generateToken(data);
          const userObj = utils.userDetails(data);
            // console.log("done", token)
          return res.status(200).json({ user: userObj, token });
        } else {
          console.log("Username or Password is Wrong.")
          return res.status(401).json({
            error: true,
            message: "Username or Password is Wrong.",
          });
        }
      // });
    }
    else {
      console.log("No user found.")
      return res.status(401).json({
        error: true,
        message: "No user found.",
      });
    }
  })
  .catch((err) => {
    if (err) {
      console.log("error is ", err)
      return res.status(400).json({
        error: true,
        message: err,
      });
    }
  })
})

app.post('/addTodo', (req, res) => {
  console.log('/addTodo')
  const userId = req.body.userId;
  const todoId = req.body.todoId;
  const todoName = req.body.todoName;
  const todoNotes = req.body.todoNotes || "";
  const dueDate = req.body.dueDate || "";
  const urgency = req.body.urgency || "";

  console.log("ids", userId, todoId, todoName, todoNotes, dueDate, urgency)

  if(!userId || !todoName || !todoId) {
    return res.status(400).json({
      error: true,
      message: "Please enter Todo name",
    });
  }
  const todoData = new AddTodoSchema({
    userId :userId,
    todoId : todoId,
    todoName : todoName,
    todoNotes : todoNotes, 
    dueDate : dueDate,
    urgency : urgency
  })

  todoData.save()
  return res.status(200).json({
    error: false,
    message: "Todo created successfully",
  });
})

app.post('/allTodos', async (req, res) => {
  console.log("/allTodos")
  let userId = req.body.userId;
  console.log("userId", userId)
  await AddTodoSchema.find({userId : userId}).then((data) => {
    // console.log("data is ", data)

    return res.send(data);
  })
  .catch((err) => console.log("err is", err))
})

app.post('/complete', (req, res) => {
  console.log("/completed")
  let todoId = req.body.postId;
  let status = req.body.status
  console.log("status", status)
  // let userId = req.body.userId;

  let obj = {
    todoId: todoId
  }
  AddTodoSchema.findOneAndUpdate(obj , {status : status }).then((data) => {
    console.log("completed data ", data)
    return res.send("done")
  })
  .catch((err) => {
    console.log("completed err is ", err)
    res.send("there are some error. please try again later")})
    return
})

app.post('/delete', (req, res) => {
  console.log("/delete")
  let postId = req.body.postId
  let userId = req.body.userId
console.log("postId", postId)
  AddTodoSchema.findOneAndDelete({todoId : postId}).then((data) => {
    
    return res.send(200)
  })
  .catch((err) => console.log("new err is", err))
})

app.post('/updateTodoInfo', (req, res) => {
  let userId = req.body.userId 
  let todoId = req.body.todoId
  let todoNotes  = req.body.todoNotes
  let dueDate  = req.body.dueDate
  let urgency = req.body.urgency 

  let update = {
    todoNotes: todoNotes,
    dueDate: dueDate,
    urgency: urgency
  }
  AddTodoSchema.findOneAndUpdate({todoId: todoId} , update).then((data) => {
    console.log("updated")
  })
  .catch((err) => console.log("err", err))
  return
})

app.post('/allMonthlyPlans', async (req, res) => {
  console.log("/allMonthlyPlans")
  let userId = req.body.userId;
  console.log("userId", userId)
  await MonthlyPlanSchema.find({monthlyPlanUserId: userId}).then((data) => {
    console.log("data is ", data)

    return res.send(data);
  })
  .catch((err) => console.log("err is", err))
})

app.post('/addMonthlyPlan', (req, res) => {
  console.log('/addMonthlyPlan')
  let monthlyPlanName = req.body.monthlyPlanName
  let monthlyPlanDate = req.body.monthlyPlanDate
  let monthlyPlanId = req.body.monthlyPlanId
  let monthlyPlanUserId = req.body.monthlyPlanUserId

  let data = new MonthlyPlanSchema({
    monthlyPlanName : monthlyPlanName,
    monthlyPlanDate : monthlyPlanDate,
    monthlyPlanId : monthlyPlanId,
    monthlyPlanUserId : monthlyPlanUserId
  })

  data.save()
  return res.status(200).json({
    error: false,
    message: "monthly plan created successfully",
  });
})

app.post('/addMPNewTodo', async (req, res) => {
  console.log('/addMPNewTodo')
  let mpId = req.body.mpId
  let mpTodoDate = req.body.mpTodoDate
  let mpNote  = req.body.mpNote
  let mpTodoId = req.body.mpTodoId

  let temp = {}
  temp[mpTodoDate] = [{mpTodoId : mpTodoId, nameOfTodo : mpNote, status: 'Not done'}]

  let obj = {
    mpTodoId: mpTodoId, nameOfTodo : mpNote, status: 'Not done'
  }
  
console.log("mpTodoDate", mpTodoDate)
  const doc = await MonthlyPlanSchema.findOne({ monthlyPlanId: mpId })
// console.log("doc", doc.monthlyPlanDaysTodo)
  let ind = await doc.monthlyPlanDaysTodo.findIndex((date) => (date[mpTodoDate]))
  // if(ind !== -1 ) console.log("ind", ind, typeof(doc.monthlyPlanDaysTodo[ind][mpTodoDate]), obj)
  if(ind !== -1 ) {doc.monthlyPlanDaysTodo[ind][mpTodoDate].push(obj)}
  else doc.monthlyPlanDaysTodo.push(temp)
// console.log("now doc is ", doc.monthlyPlanDaysTodo[ind][mpTodoDate])
doc.markModified('monthlyPlanDaysTodo')
  await doc.save()
  res.send(doc)
  return;
  
  // console.log("doc", doc. monthlyPlanDaysTodo)

  // console.log(mpId, "update", obj)
  // MonthlyPlanSchema.findOneAndUpdate({monthlyPlanId: mpId}, {$push: obj}, {upsert: true}).then((data) => {
  //   console.log("updated", data)
  // })
  // .catch((err) => console.log("mp update err is", err))
})

app.post('/getMonthlyPlanTodo', async (req, res) => {
  console.log('/getMonthlyPlanTodo')
  let mpId = req.body.mpId
console.log('mpId ', mpId )
  const doc = await MonthlyPlanSchema.findOne({ monthlyPlanId: mpId })

  console.log("doc", doc)
res.send(doc)

})

app.post('/deleteMPTodo',async (req, res) => {
  console.log('/deleteMPTodo')
  let mpId = req.body.mpId
  let mpTodoId =  req.body.mpTodoId
  let mpTodoDate = req.body.date;

  const doc = await MonthlyPlanSchema.findOne({ monthlyPlanId: mpId })
  let dateind = doc.monthlyPlanDaysTodo.findIndex((date) => (date[mpTodoDate]))
  console.log("todoInd", doc.monthlyPlanDaysTodo[dateind][mpTodoDate.toString()])
  let todoInd = doc.monthlyPlanDaysTodo[dateind][[mpTodoDate.toString()]].findIndex((todo) => (todo.mpTodoId == mpTodoId))

  doc.monthlyPlanDaysTodo[dateind][[mpTodoDate.toString()]].splice(todoInd, 1)
  doc.markModified('monthlyPlanDaysTodo')
  await doc.save();
  res.sendStatus(200)
  return
  
})

app.post('/statusMPTodo', async (req, res) => {
  console.log('/statusMPTodo')
  let mpId = req.body.mpId
  let mpTodoId =  req.body.mpTodoId
  let mpTodoDate = req.body.date;

  const doc = await MonthlyPlanSchema.findOne({ monthlyPlanId: mpId })
  let dateind = doc.monthlyPlanDaysTodo.findIndex((date) => (date[mpTodoDate]))
  let todoInd = doc.monthlyPlanDaysTodo[dateind][[mpTodoDate.toString()]].findIndex((todo) => (todo.mpTodoId == mpTodoId))
  console.log("status", doc.monthlyPlanDaysTodo[dateind][[mpTodoDate.toString()]][todoInd].status)
  let newStatus = doc.monthlyPlanDaysTodo[dateind][[mpTodoDate.toString()]][todoInd].status == "Not done" ? 'completed' : "Not done"
  doc.monthlyPlanDaysTodo[dateind][[mpTodoDate.toString()]][todoInd].status = newStatus
  doc.markModified('monthlyPlanDaysTodo')
  await doc.save();
  console.log("done")
  res.sendStatus(200)
})

app.post('/deleteMp', (req, res) => {
    console.log("/deleteMpTodo")
    let mpId = req.body.mpId
  console.log("postId", mpId)
  MonthlyPlanSchema.findOneAndDelete({monthlyPlanId : mpId}).then((data) => {
      
      return res.send(200)
    })
    .catch((err) => console.log("new err is", err))
  })

app.post('/completeMp', (req, res) => {
  console.log("/completedMp")
  let mpId = req.body.mpId;
  let mpstatus = req.body.mpstatus
  console.log("status", mpstatus)
  // let userId = req.body.userId;

  let obj = {
    monthlyPlanId: mpId
  }
  MonthlyPlanSchema.findOneAndUpdate(obj , {monthlyPlanStatus : mpstatus }).then((data) => {
    console.log("completed data ", data)
    return res.send("done")
  })
  .catch((err) => {
    console.log("completed err is ", err)
    res.send("there are some error. please try again later")})
    return
})

http.listen(PORT, () => console.log(`app is listening on http://localhost:${PORT}`))

