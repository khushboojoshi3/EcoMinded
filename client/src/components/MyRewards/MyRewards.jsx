import React, { useState } from "react";
import styles from "./MyReward.module.css";
import coin from "../../assets/coins.gif";
import congrats from "../../assets/congrats.gif";
import Modal from "react-modal";
Modal.setAppElement("#root");

function MyRewards({ rewards }) {
   const customStyles = {
     content: {
       top: "50%",
       left: "50%",
       right: "auto",
       bottom: "auto",
       marginRight: "-50%",
       transform: "translate(-50%, -50%)",
       height: "300px",
       width: "400px",
       background: `url(${congrats})`,
       backgroundPosition: "center",
       position: "relative",
     },
   };
  const [rewardInfo, setRewardInfo] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setRewardInfo({});
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.store}>
        <div className={styles.bg}>
          <h1>Your claimed rewards</h1>

          <section className={styles.pageBG}>
            <div className={styles.row}>
              {rewards.map((reward) => {
                return (
                  <div className={styles.column}>
                    <div
                      onClick={() => {
                        setRewardInfo(reward);
                        openModal();
                      }}
                      className={styles.card}
                    >
                      <img src={reward.url} alt="reward"/>
                      <p>{reward.desc}</p>
                      <div className={styles.coins}>
                        <img src={coin} alt="coins"/>
                        <p>{reward.coins}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className={styles.congrats}>
          <p>Hi Ecowarrior 🥳</p>
          <p>PROMO CODE:</p>
          <p>{rewardInfo.promocode}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(rewardInfo.promocode);
            }}
          >
            Copy
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
export default MyRewards;
