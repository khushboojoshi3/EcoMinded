import React from "react";
import { Label, Pivot, PivotItem } from "@fluentui/react";
import Header from "../../../components/Header/Header";
import Offline from "../Offline/Offline";
import Online from "../Online/Online";
import data from "../data";
import stat1 from "../../../assets/stat1.png";
import stat2 from "../../../assets/stat2.png";
import Styles from "../Design.module.css";
const labelStyles = {
  root: { marginTop: 5, backgroundColor: "white" },
};
const Stationery = () => {
  return (
    <>
      <Header />
      <div>
        <Pivot aria-label="Shop">
          <PivotItem headerText="Online Stores">
            <Label styles={labelStyles}>
              <div className={Styles.dress}>
                <img src={stat1} alt="stationery"/>
                <div className={Styles.dress1}>
                  <img src={stat2} alt="pencils"/>
                </div>
                <Online stores={data.Stationery.Online} />
              </div>
            </Label>
          </PivotItem>
          <PivotItem headerText="Offline Stores">
            <Label styles={labelStyles}>
              <div className={Styles.dress_2}>
                <img src={stat1} alt="stationery"/>
                <div className={Styles.dress_3}>
                  <img src={stat2} alt="stationery"/>
                </div>
                <Offline stores={data.Stationery.Offline}
                tagline="Write with purpose,purchase with impact!" />
              </div>
            </Label>
          </PivotItem>
        </Pivot>
      </div>
    </>
  );
};

export default Stationery;
