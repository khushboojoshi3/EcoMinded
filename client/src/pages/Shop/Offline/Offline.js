import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import styles from "../Design.module.css";
const Offline = (props) => {
  const [showOptions, setShowOptions] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const handleClickSubmit = () => {
    setShowOptions(false);
  };
  return (
    <>
      {showOptions ? (
        <>
           <div className={styles.tag}>
            <p>{props.tagline}</p>
            </div> 
          <div className={styles.offline}>
            <select
              value={selectedCity}
              //   className={Style.selection}
              onChange={(e) => {
                setSelectedCity(e.target.value);
              }}
            >
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>

            <button onClick={handleClickSubmit}>Submit</button>
          </div>
        </>
      ) : (
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
          {props.stores[selectedCity].map((store) => {
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
      )}
    </>
  );
};
export default Offline;
