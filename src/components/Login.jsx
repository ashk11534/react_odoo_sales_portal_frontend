import { useRef } from "react";

const Login = function ({ handleLoginFormSubmission, wrongLoginCredentials }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmission = function (e) {
    e.preventDefault();

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
        <button className="loginFormSubmitBtn">Login</button>
      </form>
    </div>
  );
};

export default Login;
