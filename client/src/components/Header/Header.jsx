import React, { useContext } from "react";
import Style from "../Header/Header.module.css";
import logo from "../../assets/logo.png";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <div className={Style.header}>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className={Style.heading}>
        <h1>EcoMinded</h1>
      </div>
      {!user ? (
        <div className={Style.login}>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      ) : (
        <div>
          <Navbar />
        </div>
      )}
    </div>
  );
}
export default Header;
