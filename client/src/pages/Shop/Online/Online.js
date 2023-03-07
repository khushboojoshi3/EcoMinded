import React from "react";
import styles from "../Design.module.css";
import Header from "../../../components/Header/Header";
const Online = (props) => {
  return (
    <>
      <div className={styles.table}>
        <div className={styles.table_box}>
          <div className={`${styles.table_row} ${styles.table_head}`}>
            <div className={`${styles.table_cell} ${styles.first_cell}`}>
              <p>Store Name</p>
            </div>
            <div className={`${styles.table_cell} ${styles.last_cell}`}>
              <p>Go to Website!</p>
            </div>
          </div>
          {props.stores.map((store) => {
            return (
              <>
                <div className={styles.table_row}>
                  <div className={`${styles.table_cell} ${styles.first_cell}`}>
                    <h2>{store.name}</h2>
                  </div>
                  <div className={`${styles.table_cell} ${styles.last_cell}`}>
                    <a href={store.url}>Experience the Difference!</a>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Online;
