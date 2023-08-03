import React, { useState } from "react";
import "../../../static/components/account/signin/signin.css"
import { useNavigate } from "react-router-dom";
import AuthBackground from "../AuthBackground";
import { SiMastodon } from "react-icons/si";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { setUserSession } from "../../../utils/token";
// import { goToPage } from '../../GoToPage'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from "react-router-dom";
function SignIn() {
    let navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const clickHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios
        .post("http://localhost:4000/signin", {
            username: username,
            password: password,
        })
        .then((response) => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            navigate('/user_home')
        })
        .catch((error) => {
            console.log("error", error)
            setLoading(false);
            setError(error.response.data.message);
        });
    };

function googleLogin() {
    <GoogleOAuthProvider clientId="181086612153-83ssnanod4mgoeejqahoei9a54m0p0fg.apps.googleusercontent.com">
    <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
     </GoogleOAuthProvider>
}

    return (
        <div className="signIn container">
        <div className="background"><AuthBackground /></div>
        <div className="signin_container">
            <div className="signin_data">
            <div className="signin_logo">
                <SiMastodon size={30} className="signinLogo" />
                <p className="Chatbot_logo">MUSTDO</p>
            </div>
            <div className="signin_msg">
                <h2>Please Enter Your Credentials</h2>
                <p>We recommend, enter your work email</p>
            </div>
            <div className="signin">
                <form className="signin_form">
                <input
                    type="text"
                    placeholder="Enter your username"
                    className="signin_input"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="signin_input"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="submit"
                    className="signin_submit"
                    value={loading ? "Loading..." : "Submit"}
                    onClick={clickHandler}
                />
                </form>
            </div>
            <div className="error">{error && <p>{error}</p>}</div>
            </div>

            <div className="signin_or">
            <div className="signin_or_line"></div>
            <div className="or">
                <p>OR</p>
            </div>
            <div className="signin_or_line"></div>
            </div>

            <div className="signin_or_btns">
            <div className="signin_or_btn">
                <div className="btn_signup">
                    <Link to='/signup'><button className="button_google" onClick={() => googleLogin()}>
                    Sign Up
                </button></Link>
                
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default SignIn;
