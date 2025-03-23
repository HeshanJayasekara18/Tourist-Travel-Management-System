import React from "react";
import "./MainLogin.css";
import hlogo from '../../images/h-Logo.png'; 
import hloginimg from '../../images/h-Login-img.jpeg'; 
import { useNavigate } from "react-router-dom";

const MainLogin = () => {


  const navigate=useNavigate();

  const onSubmitLogin = () => {
    navigate('/admin');
  }

  const onClickBussnessRegister=()=>{
    navigate('/property-signup');
  }

  const onClickToursitRegister=()=>{
    navigate('/tourist-signup');
  }

  const onClickGuideRegister=()=>{}


  return (
    <div className="container">
      {/* Left Side - Login Form */}
      <div className="left-panel">
        {/* Logo */}
        <div>
          <img src={hlogo} alt="CeylonGO" className="logo" />
        </div>
        <h2 className="title">Sign in</h2>
        <p className="subtitle">Please login to continue to your account</p>

        {/* Login Form */}
        <div className="form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button className="button" onClick={onSubmitLogin}>Sign in</button>
        </div>

        {/* Divider */}
        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">or</span>
          <div className="divider-line"></div>
        </div>

        {/* Sign Up Buttons */}
        <button className="signup-button" onClick={onClickToursitRegister}>Sign Up Tourist</button>
        <button className="signup-button" onClick={onClickBussnessRegister}>Sign Up Business</button>
        <button className="signup-button" onClick={onClickGuideRegister}>Sign Up Tour Guide</button>
      </div>

      {/* Right Side - Image */}
      <div className="right-panel">
        <img src={hloginimg} alt="Background" />
      </div>
    </div>
  );
};

export default MainLogin;
