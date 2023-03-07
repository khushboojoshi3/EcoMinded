import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import coins from "../../assets/coins.gif";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={styles.navbar}>
        <Link to="#" className={styles.menu_bars}>
          <FaIcons.FaBars onClick={showSidebar} value={{ color: "#375F42" }} />
        </Link>
      </div>
      {sidebar && (
        <nav className={styles.nav_menu}>
          <ul className={styles.nav_menu_items} onClick={showSidebar}>
            <li className={styles.navbar_toggle}>
              <Link to="#" className={styles.menu_bars_cross}>
                <AiIcons.AiOutlineClose value={{ color: "white" }} />
              </Link>
            </li>
            <li>
              <div className={styles.user}>
                <div className={styles.pfp_logo}>
                  <AiIcons.AiFillTrademarkCircle />
                </div>
                <div className={styles.pfpdet}>
                  <h1>{user.username}</h1>
                  <h2>EcoWarrior</h2>
                  <div className={styles.coins}>
                    <img src={coins} alt="loading..." />
                    <p>{user.coins}</p>
                  </div>
                </div>
              </div>
            </li>
            <div className={styles.nav_det}>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={styles.nav_text}>
                    <Link
                      to={
                        item.title === "Profile"
                          ? `${item.path}/${user._id}`
                          : item.path
                      }
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li className={styles.nav_text}>
                <Link to="/" onClick={handleLogout}>
                  <FiLogOut />
                  <span>Logout</span>
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navbar;
