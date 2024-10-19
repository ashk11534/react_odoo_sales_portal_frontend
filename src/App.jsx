import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { useState } from "react";

function App() {
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

    fetch("http://localhost:8085/login-react-sales-portal-user", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setLoggedIn(true);
          localStorage.setItem("react_odoo_sales_portal_user", data.user_id);
        }
        if (data.code === 404) {
          setWrongLoginCredentials(true);
        }
      });
  };

  return (
    <div className="container">
      {loggedIn && (
        <>
          <NavBar setLoggedIn={setLoggedIn} />
          <Outlet />
        </>
      )}

      {!loggedIn && (
        <Login
          handleLoginFormSubmission={handleLoginFormSubmission}
          wrongLoginCredentials={wrongLoginCredentials}
        />
      )}
    </div>
  );
}

export default App;
