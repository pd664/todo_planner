import "./App.css";
import Home from "./components/todos/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainHome from "./components/home/Home";
import MonthlyPlanHelper from './components/monthly/MonthlyPlanHelper'
import SignIn from "./components/account/signin/SignIn"; 
import SignUp from "./components/account/signup/SignUp";

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/" element={<MainHome />} />
            <Route exact path="/user_home" element={<MainHome />} />
          </Routes>
        </BrowserRouter>
        
        {/* <MonthlyPlanHelper /> */}
      </div>
    </div>
  );
}

export default App;
