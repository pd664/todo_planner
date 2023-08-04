import React, { useState, useEffect } from "react";
import "../../static/components/account/authBackground.css";

function AuthBackground() {

  return (
    <div className="auth_background">
      <div className="ripple-background">
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5 circle_full"></div>
        {/* <div className="circle smallright circle_full"></div> */}
      </div>
    </div>
  );
}

export default AuthBackground;
