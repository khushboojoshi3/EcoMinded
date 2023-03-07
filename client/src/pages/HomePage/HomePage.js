import React from "react";
import styles from "./HomePage.module.css";
import Header from "../../components/Header/Header";

import main from '../../assets/main.jpg'

import card1 from '../../assets/card1.png';
import card2 from '../../assets/card2.png';
import card3 from '../../assets/card3.png';
import card4 from '../../assets/card4.png';


import gif12 from "../../assets/gif12.gif";

function HomePage(){
return (
  <>
    <Header />
    <div className={styles.border}>
      <div id={styles.bg}>
        <h1>Mindful Choices, Better Future</h1>

        <p>
          Sustainable living choices benefit the environment and well-being.
          Reduce waste, conserve, support eco-friendly practices. A better
          future.
        </p>
      </div>
      <div className={styles.mainpic}>
        <img src={main} alt="loading..." />
      </div>
    </div>
    <div className={styles.cause}>
      <div className={styles.rec1}></div>
      <div className={styles.rec2}></div>
      {/* <div className={styles.rec3}></div> */}
      <div className={styles.polaroid}>
        <div className={styles.gifi}>
          <img src={gif12} alt="Global Warming"/>
        </div>
        <div className={styles.fact}>
          <h1>Did you know?</h1>
          <p>
            The Amazon rainforest,known as the "lungs of the Earth, is
            disapperaing at an alarming rate.{" "}
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.headingcause}>
          <h1>We are the cause</h1>
        </div>
        <div className={styles.bgcause}>
          <h1>caUSe</h1>
        </div>
        <div className={styles.bgcause1}>
          <h1>dAMage</h1>
        </div>
        <div className={styles.bgcause2}>
          <h1>ruIn</h1>
        </div>
        <div className={styles.bgcause3}>
          <h1>impairMEnt</h1>
        </div>
        <div className={styles.bgcause4}>
          <h1>WEakening</h1>
        </div>

        <div className={styles.content_det}>
          <div className={styles.content_det1}>
            <h1>Energy Consumption</h1>
            <p>
              Excessive consumption leads to increased use of fossil fuels for
              energy generation which is the major contributor to greenhouse gas
              emissions.
            </p>
            <br />
          </div>
          <div className={styles.content_det2}>
            <h1>Consumerism</h1>
            <p>
              Our culture of constant consumption and disposability is fueling
              resource depletion and waste production.
            </p>
            <br />
          </div>
          <div className={styles.content_det3}>
            <h1>Waste Management</h1>
            <p>
              Poor waste management ranges from improper disposal, insufficient
              recycling, and excessive consumption
            </p>
          </div>
        </div>
      </div>
      {/* <div className={styles.bor_env}>
          <img src={env}/>
          </div> */}
    </div>

    <div className={styles.soln}>
      <div className={styles.recsoln}></div>
      <div className={styles.recsoln1}></div>
      <div className={styles.recsoln2}></div>
      <div className={styles.heading}>
        <h1>We are the solution!</h1>
      </div>
      <div className={styles.cards}>
        <div className={styles.frontrow}>
          <div className={styles.card1}>
            <img src={card1} alt="../reduce energy consumption" />
            <p>Reducing Energy Consumption</p>
          </div>
          <div className={styles.card2}>
            <img src={card2} alt="../reduce energy consumption" />
            <p>Proper Waste Disposal</p>
          </div>
        </div>
        <div className={styles.secondrow}>
          <div className={styles.card3}>
            <img src={card3} alt="../reduce energy consumption" />
            <p>Purchasing Sustainably</p>
          </div>
          <div className={styles.card4}>
            <img src={card4} alt="../reduce energy consumption" />
            <p>Zero waste practices</p>
          </div>
        </div>
      </div>
    </div>

    <div className={styles.footer}>
      <div className={styles.contain}>
        <div className={styles.col}>
          <div className={styles.idea}>
            <h1>Idea</h1>
          </div>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);
}

export default HomePage;
