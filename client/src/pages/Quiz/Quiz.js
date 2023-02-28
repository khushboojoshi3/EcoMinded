import React from "react";
import Header from "../../components/Header/Header";
import styles from "./Quiz.module.css";
import quiz from "../../assets/quiz.jpg";
import trophy from "../../assets/trophy.gif";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
function Quiz() {
  const playclick = () => {
    console.log("Click");
  };

  return (
    <>
      <Header />
      <div className={styles.quiz}>
        <div className={styles.gif}>
          <img src={quiz} alt="play quiz"/>
          <div className={styles.button}>
            <div className={styles.rect}>
              <Link to="#" className={styles.playicon}>
                <AiIcons.AiOutlinePlayCircle onClick={playclick} />
              </Link>
              <h1>Play Quiz!</h1>
            </div>
          </div>
        </div>
        <div className={styles.leader}>
          <div className={styles.trophy}>
            <img src={trophy} alt="trophy"/>
          </div>
          <h1>Leaderboard</h1>
        </div>
      </div>
    </>
  );
}
export default Quiz;
