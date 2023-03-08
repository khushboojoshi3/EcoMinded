import React from 'react';
import { Label, Pivot, PivotItem } from "@fluentui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import Header from "../../../components/Header/Header";
import Offline from "../Offline/Offline";
import Online from "../Online/Online";
import styles from "./Grocery.module.css";
import Styles from "../Design.module.css";
import groc1 from "../../../assets/groc1.png";
import groc2 from "../../../assets/groc2.png";
import data from '../data';
const labelStyles = {
  root: { marginTop: 5, backgroundColor: "white" },
};
const Grocery = () => {
    return (
      <>
        <Header />
        <div className={styles.pivot}>
          <Pivot aria-label="Shop">
            <PivotItem headerText="Online Stores">
              <Label styles={labelStyles}>
                <div className={Styles.dress}>
                  <img src={groc1} />
                  <div className={Styles.dress1}>
                    <img src={groc2} />
                  </div>
                  <Online stores={data.Grocery.Online} />
                </div>
              </Label>
            </PivotItem>
            <PivotItem headerText="Offline Stores">
              <Label styles={labelStyles}>
                <div className={Styles.dress_2}>
                  <img src={groc1} />
                  <div className={Styles.dress_3}>
                    <img width="260" height="420" src={groc2} />
                  </div>
                  <Offline
                    stores={data.Grocery.Offline}
                    tagline="Every purchase is a vote for a better future!"
                  />
                </div>
              </Label>
            </PivotItem>
          </Pivot>
        </div>
      </>
    );
}

export default Grocery;