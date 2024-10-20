import { useRef, useState } from "react";
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading'

const Login = function ({ handleLoginFormSubmission, wrongLoginCredentials, loggingIn }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmission = function (e) {
    e.preventDefault();

    if(emailRef.current.value.length === 0 && passwordRef.current.value.length === 0){
      return;
    }

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    handleLoginFormSubmission(formData);
  };

  return (
    <div className="loginFormContainer">
      <form className="loginForm" onSubmit={handleSubmission}>
        <h4 className="text-center  mb-4">Login to your account</h4>
        {wrongLoginCredentials && (
          <div className="alert alert-danger mb-3">Wrong email/password</div>
        )}
        <input
          type="email"
          placeholder="Enter your email"
          className="loginFormInput mb-2"
          id="userEmail"
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="loginFormInput mb-3"
          id="userPassword"
          ref={passwordRef}
        />
        {!loggingIn && <button className="loginFormSubmitBtn">Login</button>}
        {loggingIn && <button type="button" className="loginFormSubmitBtn" disabled={true}><UseAnimations animation={loading} size={25} strokeColor="#fff" /></button>}
      </form>
    </div>
  );
};

export default Login;
