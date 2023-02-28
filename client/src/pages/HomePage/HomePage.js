import React from "react";
import styles from "./HomePage.module.css";
import Header from "../../components/Header/Header";

import main from "../../assets/main.jpg";
import env from "../../assets/env.png";

import gif from "../../assets/gif.gif";
import gif12 from "../../assets/gif12.gif";

function HomePage() {
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
          <img src={main} alt="sustainability" />
        </div>
      </div>
      <div className={styles.cause}>
        <div className={styles.border}>
          <div className={styles.rec1}></div>
          <div className={styles.rec2}></div>
          <div className={styles.rec3}></div>
          <div className={styles.polaroid}>
            <div className={styles.gifi}>
              <img src={gif12} alt="Global Warming" />
            </div>
            <div className={styles.fact}>
              <h1>Did you know?</h1>
              <p>
                Plastic pollution is a major problem for our oceans and
                wildlife. It is estimated that there are over 5 trillion pieces
                of plastic in the world's oceans, and that number is growing
                every day.
              </p>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.headingcause}>
              <h1>We are the cause</h1>
            </div>
            <div className={styles.content_det}>
              <div className={styles.content_det1}>
                <h1>Energy Consumption</h1>
                <p>
                  Excessive consumption leads to increased use of fossil fuels
                  for energy generation which is the major contributor to
                  greenhouse gas emissions.
                </p>
                <br />
              </div>
              <div className={styles.content_det2}>
                <h1>Consumerism</h1>
                <p>
                  Our culture of constant consumption and disposability is
                  fueling resource depletion and waste production.
                </p>
                <br />
              </div>
              <div className={styles.content_det3}>
                <h1>Waste Management</h1>
                <p>
                  Poor waste management ranges from improper disposal,
                  insufficient recycling, and excessive consumption
                </p>
              </div>
            </div>
          </div>
          <div className={styles.bor_env}>
            <img src={env} alt="save earth" />
          </div>
        </div>
      </div>

      <div className={styles.logo}>
        <div className={styles.heading}>
          <h1>We are the solution!</h1>
        </div>
        <div className={styles.para}>
          <p>
            Sustainable living is a lifestyle that seeks to reduce the impact of
            human activities on the environment and conserve natural resources
            for future generations.
          </p>
          <div className={styles.pointer}>
            <p>
              Reducing Energy Consumption.
              <br />
              Proper Waste Disposal.
              <br />
              Purchasing Sustainably from brands that care for the environment.
              <br />
              Reducing waste production by following zero waste practices.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.gif}>
        <img src={gif} alt="loading..." />
      </div>
      <div className={styles.logo}>
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
      </div>
    </>
  );
}

export default HomePage;
