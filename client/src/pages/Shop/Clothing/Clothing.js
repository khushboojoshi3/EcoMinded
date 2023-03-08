import React from "react";
import { Label, Pivot, PivotItem } from "@fluentui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import Header from "../../../components/Header/Header";
import styles from "./Clothing.module.css";
import Offline from "../Offline/Offline";
import Online from "../Online/Online";
import data from "../data";
import dress from "../../../assets/dress.png";
import Styles from "../Design.module.css";
const labelStyles = {
  root: { marginTop: 5, backgroundColor: "white" },
};
const Clothing = () => {
  return (
    <>
      <Header />

      <div className={styles.pivot}>
        <Pivot aria-label="Shop">
          <PivotItem headerText="Online Stores">
            <Label styles={labelStyles}>
              <div className={Styles.dress}>
                <img src={dress} />
                <div className={Styles.dress1}>
                  <img src={dress} />
                </div>

                <Online stores={data.Clothing.Online} />
             </div>
            </Label>
          </PivotItem>
          <PivotItem headerText="Offline Stores">
            <Label styles={labelStyles}>
              <div className={Styles.dress_2}>
                <img src={dress} />
                <div className={Styles.dress_3}>
                  <img src={dress} />
                </div>
                <Offline stores={data.Clothing.Offline} tagline="Style that won't cost the Earth!" />
              </div>
            </Label>
          </PivotItem>
        </Pivot>
      </div>
    </>
  );
};

export default Clothing;
