import React from "react";
import { Label, Pivot, PivotItem } from "@fluentui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import Header from "../../../components/Header/Header";
import styles from "./Furniture.module.css";
import Offline from "../Offline/Offline";
import Online from "../Online/Online";
import data from "../data";
import fur1 from "../../../assets/fur1.png";
import fur2 from "../../../assets/fur2.png";
import Styles from "../Design.module.css";
const labelStyles = {
  root: { marginTop: 5, backgroundColor: "white" },
};
const Furniture = () => {
  return (
    <>
      <Header />
      <div className={styles.pivot}>
        <Pivot aria-label="Shop">
          <PivotItem headerText="Online Stores">
            <Label styles={labelStyles}>
             <div className={Styles.dress}>
                <img src={fur2} />
                <div className={Styles.dress1}>
                  <img src={fur1} />
                </div>
              <Online stores={data.Furniture.Online} />
              </div>
            </Label>
          </PivotItem>{" "}
          <PivotItem headerText="Offline Stores">
            <Label styles={labelStyles}>
               <div className={Styles.dress_2}>
                <img width="420"  height ="520" src={fur2} />
                <div className={Styles.dress_3}>
                  <img src={fur1} />
                </div>
              <Offline stores={data.Furniture.Offline}
              tagline="Furnish your home with a clear conscience!"/>
             </div>
            </Label>
          </PivotItem>
        </Pivot>
      </div>
    </>
  );
};

export default Furniture;
