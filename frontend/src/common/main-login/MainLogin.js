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
    <div className="container-login">
      {/* Left Side - Login Form */}
      <div className="left-panel-login">
        {/* Logo */}
        <div>
          <img src={hlogo} alt="CeylonGO" className="logo-login" />
        </div>
        <h2 className="title-login">Sign in</h2>
        <p className="subtitle-login">Please login to continue to your account</p>

        {/* Login Form */}
        <div className="form-login">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button className="button-login" onClick={onSubmitLogin}>Sign in</button>
        </div>

        {/* Divider */}
        <div className="divider-login">
          <div className="divider-line-login"></div>
          <span className="divider-text-login">or</span>
          <div className="divider-line-login"></div>
        </div>

        {/* Sign Up Buttons */}
        <button className="signup-button-login" onClick={onClickToursitRegister}>Sign Up Tourist</button>
        <button className="signup-button-login" onClick={onClickBussnessRegister}>Sign Up Business</button>
        <button className="signup-button-login" onClick={onClickGuideRegister}>Sign Up Tour Guide</button>
      </div>

      {/* Right Side - Image */}
      <div className="right-panel-login">
        <img src={hloginimg} alt="Background" />
      </div>
    </div>
  );
};

export default MainLogin;
