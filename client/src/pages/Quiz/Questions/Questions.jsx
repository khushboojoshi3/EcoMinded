import React, { Component, useState, useEffect, useContext } from "react";
import data from "./data.js";
import Answers from "./Answers.jsx";
import Popup from "./Popup.jsx";
import Styles from "./Questions.module.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../../../context/AuthContext.js";
const Questions = () => {
  const { user } = useContext(AuthContext);
  const [showButton, setShowButton] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  
  const [displayPopup, setDisplayPopup] = useState("flex");
  const [total, setTotal] = useState(data.length);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState();
  useEffect(() => {
    insertData(count);
  }, []);
  const insertData = (count) => {
    setQuestion(data[count].question);
    setAnswers([
      data[count].answers[0],
      data[count].answers[1],
      data[count].answers[2],
      data[count].answers[3],
    ]);
    setCorrect(data[count].correct);
  };

  const handleShowButton = () => {
    setShowButton(true);
    setQuestionAnswered(true);
  };
const handleFinish = async () => {
  try {
    const newPlayer = await axios.post(
      `/leaderboard/${user._id}`,
      {
        playerid: user._id,
        score: score
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // await updateBlogs();
    // closeModal();
    // setIsSubmitDisabled(false);
    console.log(newPlayer);
    // navigate(`/blogview/${newBlog.data._id}`);
  } catch (err) {
    console.log(err.response.data);
  }
};


  const nextQuestion = () => {
    if (count === total) {
      setDisplayPopup("flex");
      handleFinish();
    } else {
      setCount((count) => count + 1);
      insertData(count);

      setShowButton(false);
      setQuestionAnswered(false);
    }
  };

  const handleStartQuiz = () => {
    setDisplayPopup("none");
    setCount(1);
  };

  const handleIncreaseScore = () => {
    setScore((score) => score + 1);
  };
  let Details = [
    {
      type: "Party",
      image: require("../../../assets/quiz1.jpg"),
    },
    {
      type: "Wedding",
      image: require("../../../assets/fur.png"),
    },
    {
      type: "Architecture",
      image: require("../../../assets/netflix.png"),
    },
    {
      type: "Christening",
      image: require("../../../assets/foot.png"),
    },
  ];
  const updatecount = () => {
    setCount((count) => count + 1);
  };
  const navigate = useNavigate();

  return (
    <div className="container">
      {count === 0 && (
        <Popup
          style={{ display: displayPopup }}
          buttonText="Go Green!"
          text=" 
           How Green are you ?"
          popupHandle={handleStartQuiz}
          title="Welcome"
        />
      )}
      {count === 5 && (
        // handleFinish()
        <Popup
          style={{ display: displayPopup }}
          score={score}
          total={total}
          buttonText="Go back "
          popupHandle={() => {
            navigate("/quiz");
          }}
          title="Congrats"
        />
      )}

      <div className="row">
        <div className="col-lg-12 col-md-10">
          <div id={Styles.question}>
            <h4 className="bg-light">
              Question {count}/{total}
            </h4>
            <p>{question}</p>
            <img src={Details[0].image} alt="env_photo" />
          </div>

          <Answers
            updatedCount={updatecount}
            answers={answers}
            correct={correct}
            showButton={handleShowButton}
            isAnswered={questionAnswered}
            increaseScore={handleIncreaseScore}
          />

          <div id={Styles.submit}>
            {showButton ? (
              <button className={Styles.fancy_btn} onClick={nextQuestion}>
                {count === total ? "Finish quiz" : "Next question"}
              </button>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  //   }
};
export default Questions;