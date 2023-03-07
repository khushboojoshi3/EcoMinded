import React from "react";
import Header from "../../components/Header/Header";
import styles from "./Dispose.module.css";
import * as FaIcons from "react-icons/fa";
import bin1 from '../../assets/1.png';
import bin2 from "../../assets/2.png";
import bin3 from "../../assets/3.png";
import bin4 from "../../assets/4.png";
function Dispose()
{
  return (
    <>
      <Header />
      <div className={styles.dispose}>
        <div className={styles.heading}>
          <h1>
            Waste segregation at source can reduce up to 250 tonnes of dump from
            entering into landfills.
          </h1>
        </div>
        <div className={styles.bin}>
          <div className={styles.bin1}>
            <img src={bin1} alt="../green bin"></img>
            <p>Wet Waste</p>
          </div>
          <div className={styles.bin2}>
            <img src={bin2} alt="../blue bin"></img>
            <p>Dry Waste</p>
          </div>
          <div className={styles.bin3}>
            <img src={bin3} alt="../red bin"></img>
            <p>Sanitary Waste</p>
          </div>
          <div className={styles.bin4}>
            <img src={bin4} alt="../e-waste bin"></img>
            <p>E-Waste</p>
          </div>
        </div>
        <div className={styles.info}>
          <h2>
            Facing difficulty in waste segregation contact us at +1 (425)523-8886
          </h2>
          <div className={styles.icon}>
          <FaIcons.FaWhatsapp />
          </div>
        </div>
      </div>
    </>
  );
}
export default Dispose;
