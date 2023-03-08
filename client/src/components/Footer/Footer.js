import React, { useContext } from "react";
import styles from "../Footer/Footer.module.css";
import * as AiIcons from "react-icons/ai";
function Footer(){
    return (
      <>
        <div className={styles.footer}>
          <div className={styles.contain}>
            <div className={styles.col}>
              <div className={styles.idea}>
                <h1>EcoMinded</h1>
                <p>
                  Sustainable living seeks to reduce environmental impact and
                  conserve resources for future generations.
                </p>
              </div>
              <ul>
              </ul>
            </div>
            <div className={styles.col1}>
              <hr></hr>
              <p>Get in Touch</p>
              <div className={styles.socialicons}>
                <AiIcons.AiFillTwitterCircle />
                <AiIcons.AiOutlineInstagram />
                <AiIcons.AiFillFacebook />
              </div>
            </div>
            <div className={styles.lastline}>
              <p>Copyright &#169; 2023 EcoMinded.All Rights Reserved</p>
            </div>
          </div>
        </div>
      </>
    );

}
export default Footer;