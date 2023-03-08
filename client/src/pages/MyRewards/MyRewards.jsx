import React, { useState, useContext } from "react";
import styles from "../Store/Store.module.css";
import coin from "../../assets/coins.gif";
import { AuthContext } from "../../context/AuthContext";
import Modal from "react-modal";
Modal.setAppElement("#root");

function Store({rewards, updateRewards}) {
  const { user, dispatch } = useContext(AuthContext);
  const customstyles = {
    content: {
      top: "52%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "320px",
      width: "400px",
    },
  };

  
const [rewardInfo, setRewardInfo] = useState({});

const [viewReward, setViewReward] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setRewardInfo({});
    setIsOpen(false);
  };


  
  const openReward = async (reward) => {
    setViewReward(true);
    try {
      const rewardObj = reward;
      setRewardInfo(rewardObj);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const closeReward = () => {
    setViewReward(false);
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
                            openModal()}}
                          className={styles.card}
                        >
                          <img src={reward.url} />
                          <p>{reward.desc}</p>
                          <div className={styles.coins}>
                            <img src={coin}></img>
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
        style={customstyles}
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
export default Store;
