import React, { useState } from "react";
import "../../../static/components/account/signup/signup.css";
import { useNavigate } from "react-router-dom";
import AuthBackground from "../AuthBackground";
import { SiMastodon } from "react-icons/si";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import bcrypt from "bcryptjs";
import { GoogleLogin } from '@react-oauth/google';
// const { OAuth2Client } = require('google-auth-library')
import jwt_decode from "jwt-decode";

function SignUp() {
  let navigate = useNavigate()
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const clickHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("clicked")
    axios
      .post("http://localhost:4000/signup", {
        name: name,
        username: username,
        email: email,
        password: hashPassword(password),
      })
      .then((res) => {
        setLoading(false);
        alert(res.data.message);
        navigate('/signin')
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        setError(err.message);
      });
  };

  const hashPassword = (pass) => {
    const salt = bcrypt.genSaltSync(process.env.SALT);
    return bcrypt.hashSync(pass, salt);
  };
  const responseMessage = async (response) => {
    const CLIENT_ID_GOOGLE = '181086612153-83ssnanod4mgoeejqahoei9a54m0p0fg.apps.googleusercontent.com'
    const userObject = jwt_decode(response.credential);
    
    userObject && setName(userObject.name)
    userObject && setEmail(userObject.email)
    
    console.log("Accesss", userObject.name)

};
const errorMessage = (error) => {
    console.log(error);
};
  return (
    <div className="signUp">
      <div className="background"><AuthBackground /></div>
      <div className="signup_container">
        <div className="signup_data">
          <div className="signup_logo">
            <SiMastodon size={50} className="signupLogo" />
            <p className="Chatbot_logo">Chatbot</p>
          </div>

          <div className="signup_msg">
            <h2>Sign Up</h2>
            <h3>Please Enter Your Credentials.</h3>
            <p>We recommend, enter your work email</p>
          </div>

          <div className="signup">
            <form className="signup_form">
              <input
                value={name ? name : ""}
                type="text"
                placeholder="Enter your name"
                className="signup_input"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your unique username"
                className="signup_input"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
              value={email ? email : ""}
                type="text"
                placeholder="Enter your Email"
                className="signup_input"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="signup_input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="submit"
                value={loading ? "Loading..." : "Submit"}
                className="signup_submit"
                onClick={clickHandler}
              />
            </form>
            <div className="error">{error && <p>{error}</p>}</div>
          </div>

          <div className="signup_or">
            <div className="signup_or_line"></div>
            <div className="or">
              <p>OR</p>
            </div>
            <div className="signup_or_line"></div>
          </div>

          <div className="signup_or_btns">
            <div className="signup_or_btn_googles">
              <div className="btn_googles">
                {/* <button className="button_googles"> */}
                  {/* <span className="google_logos"> */}
                    {/* <AiOutlineGoogle /> */}
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                  {/* </span> */}
                  
                {/* </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
