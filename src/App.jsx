import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { useState } from "react";
import {AppContext} from "./components/context_store/app_context";

function App() {
  const[loggingIn, setLoggingIn] = useState(false);
  const[reRenderHomePage, setReRenderHomePage] = useState(false);

  const handleReRenderHomePage = function(){
    setReRenderHomePage((cur) => !cur);
  }

  const [loggedIn, setLoggedIn] = useState(() => {
    const user_id = localStorage.getItem("react_odoo_sales_portal_user");
    if (user_id) return true;
    else return false;
  });
  
  const [wrongLoginCredentials, setWrongLoginCredentials] = useState(false);

  const handleLoginFormSubmission = function (formData) {
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    setLoggingIn(true);

    fetch("http://localhost:8089/login-react-sales-portal-user", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setLoggedIn(true);
          setLoggingIn(false);
          setWrongLoginCredentials(false);
          localStorage.setItem("react_odoo_sales_portal_user", data.user_id);
        }
        if (data.code === 404) {
          setLoggingIn(false);
          setWrongLoginCredentials(true);
        }
      });
  };

  return (
    <div className="container">
      {loggedIn && (
        <AppContext.Provider value={{reRenderHomePage, handleReRenderHomePage}}>
          <NavBar setLoggedIn={setLoggedIn} />
          <Outlet />
        </AppContext.Provider>
      )}

      {!loggedIn && (
        <Login
          handleLoginFormSubmission={{handleLoginFormSubmission}}
          wrongLoginCredentials={wrongLoginCredentials}
          loggingIn={loggingIn}
        />
      )
      }
    </div>
  );
}

export default App;
