import React from "react";
import Style from "../Header/Header.module.css";
import logo from "../../assets/logo.png";
import Navbar from "../../components/Navbar/Navbar";

function Header() {
  return (
      <div className={Style.header}>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className={Style.heading}>
          <h1>EcoMinded</h1>
        </div>
        <div>
          <Navbar/>
        </div>
    </div>
  );
}
export default Header;

