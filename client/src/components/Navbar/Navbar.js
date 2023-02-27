import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import coins from "../../assets/coins.gif";
import styles from "./Navbar.module.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className={styles.navbar}>
        <Link to="#" className={styles.menu_bars}>
          <FaIcons.FaBars onClick={showSidebar} value={{ color: "#375F42" }} />
        </Link>
      </div>
        {sidebar && <nav
              className={styles.nav_menu}
          >
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
                              <h1>Deepali</h1>
                              <h2>EcoWarrior</h2>
                              <div className={styles.coins}>
                                  <img src={coins} alt="loading..." />
                                  <p>100</p>
                              </div>
                          </div>
                      </div>
                  </li>
                  <div className={styles.nav_det}>
                      {SidebarData.map((item, index) => {
                          // const itemClass=item.cName;
                          return (
                              <li key={index} className={styles.nav_text}>
                                  <Link to={item.path}>
                                      {item.icon}
                                      <span>{item.title}</span>
                                  </Link>
                              </li>
                        );
                    })}
                </div>
            </ul>
        </nav>}
    </>
  );
}

export default Navbar;
