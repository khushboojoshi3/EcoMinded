import logo from "../../assets/logo.png";
import style from "./Header.module.css";
export function Header() {
    return (
      <header className={style.header}>
        <img src={logo} alt="logo" className={style.logo} /> 
        <h2>EcoMinded</h2>
      </header>
    );
}