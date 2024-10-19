import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = function ({ setLoggedIn }) {
  const [userImage, setUserImage] = useState("");

  const handleUserLogOut = function () {
    localStorage.removeItem("react_odoo_sales_portal_user");
    setLoggedIn(false);
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append(
      "userId",
      localStorage.getItem("react_odoo_sales_portal_user")
    );

    fetch("http://localhost:8085/search-user", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserImage(data.user_image);
      });
  }, []);

  return (
    <nav className="navBar mt-2">
      <Link to="/" className="logo">
        <img src="images/sales_logo.png" alt="Logo" />
      </Link>

      <div className="userImageAndLogoutBtn">
        <button className="logoutBtn" onClick={handleUserLogOut}>
          Log out
        </button>
        <div className="userImage">
          <img src={`data:image/png;base64,${userImage}`} alt="user image" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
