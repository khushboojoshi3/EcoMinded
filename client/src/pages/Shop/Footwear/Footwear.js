import React from "react";
import { Label, Pivot, PivotItem } from "@fluentui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import Header from "../../../components/Header/Header";
import styles from "./Footwear.module.css";
import Offline from "../Offline/Offline";
import Online from "../Online/Online";
import data from "../data";
import foot1 from "../../../assets/foot1.png";
import foot2 from "../../../assets/foot2.png";
import Styles from "../Design.module.css";
const labelStyles = {
  root: { marginTop: 5, backgroundColor: "white" },
};
const Footwear = () => {
  return (
    <>
      <Header />
      <div className={styles.pivot}>
        <Pivot aria-label="Shop">
          <PivotItem headerText="Online Stores">
            <Label styles={labelStyles}>
              <div className={Styles.dress}>
                <img src={foot2} />
                <div className={Styles.dress1}>
                  <img src={foot1} />
                </div>
                <Online stores={data.Footwear.Online} />
              </div>
            </Label>
          </PivotItem>
          <PivotItem headerText="Offline Stores">
            <Label styles={labelStyles}>
              <div className={Styles.dress_2}>
                <img src={foot2} />
                <div className={Styles.dress_3}>
                  <img width="370" height="460" src={foot1} />
                </div>
                <Offline
                  stores={data.Footwear.Offline}
                  tagline="Walk the talk of sustainability!"
                />
              </div>
            </Label>
          </PivotItem>
        </Pivot>
      </div>
    </>
  );
};

export default Footwear;
