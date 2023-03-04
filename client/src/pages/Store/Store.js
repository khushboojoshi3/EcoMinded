import React, { useState, useContext } from "react";
import Header from "../../components/Header/Header";
import styles from "./Store.module.css";
import Reward from "../../assets/reward.gif";
import Netflix from "../../assets/netflix.png";
import Myntra from "../../assets/myntra.png";
import Amazon from "../../assets/amazon.png";
import Flipkart from "../../assets/flipkart.png";
import coin from "../../assets/coins.gif";

import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "react-query";
import axios from "axios";
import Modal from "react-modal";
Modal.setAppElement("#root");

function Store() {
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
      // background: "rgba(67, 135, 86, 0.527);",
      width: "400px",
    },
  };

  const {
    data: rewards,
    isLoading: isLoadingReward,
    error: errReward,
    refetch: refetchReward,
  } = useQuery(
    "rewards",
    () => {
      return axios.get(`/user/allRewards/${user._id}`);
    },
    { refetchInterval: 120000 }
  );

  const fetchUpdatedRewards = async () => {
    await refetchReward();
  };

  const [rewardInfo, setRewardInfo] = useState({});

  const [viewReward, setViewReward] = useState(false);
  const openReward = async (reward) => {
    setViewReward(true);
    try {
      const rewardObj = reward;
      // artObj.data.views += 1;
      setRewardInfo(rewardObj);
      // await axios.put(`/art/views/${art.data._id}`);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const closeReward = () => {
    setRewardInfo({});
    setViewReward(false);
  };

  const handleFinalClick = async () => {
    console.log(rewardInfo);
    if (rewardInfo.coins <= user.coins) {
      try {
        const updatedUser = await axios.put(
          `/user/claimedRewards/${user._id}/${rewardInfo._id}`,
          {},
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        dispatch({ type: "UPDATE_USER", payload: updatedUser.data });
        await fetchUpdatedRewards();
        closeReward();
      } catch (err) {
        console.log(err.response.data);
      }
    } else {
      alert("You don't have enough coins to redeem this voucher.");
      closeReward();
    }
  };
  return (
    <>
      <Header />
      <div className={styles.store}>
        <div className={styles.bg}>
          <h1>Claim your rewards!</h1>
          {errReward ? (
            "An error occured"
          ) : isLoadingReward ? (
            "Loading"
          ) : (
            <>
              <section className={styles.pageBG}>
                <div className={styles.row}>
                  {rewards.data.map((reward) => {
                    return (
                      <div 
                      className={styles.column}
                      >
                        <div
                          onClick={() => openReward(reward)}
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
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={viewReward}
        onRequestClose={closeReward}
        style={customstyles}
        contentLabel="Viewing Reward"
      >
        {
          <div className={styles.popup}>
            <div className={styles.modalHeader}>
              <div className={styles.viewArt}>
                <p>You can view chosen reward here</p>
              </div>
              {/* <div className={styles.close}>
                <button onClick={closeReward}>close</button>
              </div> */}
            </div>
            <div className={styles.rewardInfo}>
              <p>
                You are choosing
                <div className={styles.dis}>
                  {rewardInfo.desc} {rewardInfo.name}
                </div>
              </p>
              <p>
                <b>{rewardInfo.coins} </b>coins will be deducted from your
                profile.
              </p>
              <div className={styles.endbutton1}>
                <button onClick={() => handleFinalClick()}>YES</button>
              </div>
              <div className={styles.endbutton2}>
                <button onClick={closeReward}>NO</button>
              </div>
            </div>
          </div>
        }
      </Modal>
    </>
  );
}
export default Store;
