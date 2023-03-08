import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import styles from "./Quiz.module.css";
import quiz from "../../assets/quiz.jpg";
import trophy from "../../assets/trophy.gif";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import * as AiIcons from "react-icons/ai";

function Quiz() {
  const {
    data: players,
    isLoading: isLoadingPlayer,
    error: errPlayer,
    refetch: refetchPlayer,
  } = useQuery(
    "leaderboard",
    () => {
      return axios.get("/leaderboard");
    },
    { refetchInterval: 120000 }
  );
  const fetchUpdatedPlayers = async () => {
    await refetchPlayer();
  };

  return (
    <>
      <Header />
      <div className={styles.quiz}>
        <div className={styles.gif}>
          <img src={quiz} alt="quiz bg"/>
          <div className={styles.button}>
            <div className={styles.rect}>
              <Link to="./questions" className={styles.playicon}>
                <AiIcons.AiOutlinePlayCircle />
              </Link>
              <h1>Play Quiz!</h1>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.leader}>
        <div className={styles.trophy}>
          <img src={trophy} alt="trophy" />
        </div>
        <h1>Leaderboard</h1>
      </div>
      <div className={styles.table}>
        <div className={styles.table_box}>
          <div className={`${styles.table_row} ${styles.table_head}`}>
            <div className={`${styles.table_cell} ${styles.first_cell}`}>
              <p>Rank</p>
            </div>
            <div className={`${styles.table_cell} ${styles.mid_cell}`}>
              <p>Name</p>
            </div>
            <div className={`${styles.table_cell} ${styles.last_cell}`}>
              <p>Score</p>
            </div>
          </div>
          {errPlayer ? (
            "Error required"
          ) : isLoadingPlayer ? (
            "Loading Player"
          ) : (
            <>
              {players.data.map((playerInfo, idx) => {
                return (
                  <div className={styles.table_row}>
                    <div
                      className={`${styles.table_cell} ${styles.first_cell}`}
                    >
                      <p>{idx + 1}</p>
                    </div>
                    <div className={`${styles.table_cell} ${styles.mid_cell}`}>
                      <p>{playerInfo.player.name}</p>
                    </div>
                    <div className={`${styles.table_cell} ${styles.last_cell}`}>
                      <p>{playerInfo.data.score * 10}</p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Quiz;
