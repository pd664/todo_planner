const express = require("express");
const app = express();
const SignUpSchema = require("../schema/credentilasSchema");
const emailValidator = require("deep-email-validator");

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

module.exports=app;
