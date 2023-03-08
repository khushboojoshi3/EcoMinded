import React from "react";
import Header from "../../components/Header/Header";
import styles from "./Shop.module.css";
import shop from "../../assets/shop.png";
import foot from "../../assets/foot.png";
import stat from "../../assets/stat.png";
import groc from "../../assets/groc.png";
import fur from "../../assets/fur.png";
import { Link } from "react-router-dom";
function Shop() {
  return (
    <>
      <Header />
      <div className={styles.shop}>
        <div className={styles.heading}>
          <h1>Think twice before you shop!</h1>
          <p>
            {" "}
            A reminder for consumers to consider the impact of their purchases
            on the planet,
            <br />
            people, and their own wallets before making a purchase.
          </p>
          <div className={styles.front_row}>
            <div className={styles.circle_shop}>
              <Link to="./clothing">
                <img src={shop} alt="clothes" />
                <p>Clothes</p>
              </Link>
            </div>
            <div className={styles.circle_groc}>
              <Link to="./grocery">
                <img src={groc} alt="grocery" />
                <p>Grocery</p>
              </Link>
            </div>
            <div className={styles.circle_foot}>
              <Link to="./footwear">
                <img src={foot} alt="footwear" />
                <p>Footwear</p>
              </Link>
            </div>
          </div>
          <div className={styles.second_row}>
            <div className={styles.circle_fur}>
              <Link to="./furniture">
                <img src={fur} alt="furniture" />
                <p>Furniture</p>
              </Link>
            </div>
            <div className={styles.circle_stat}>
              <Link to="./stationery">
                <img src={stat} alt="stationery" />
                <p>Stationery</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Shop;
