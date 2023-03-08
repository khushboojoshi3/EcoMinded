import React from "react";
import MyButton from "./Button";
import Fade from "react-reveal/Fade";
import Styles from "./Questions.module.css";

const Popup = ({
  score,
  total,
  text,
  title,
  buttonText,
  style,
  popupHandle,
  tagline,
}) => {
  return (
    <Fade delay={300}>
      <div className={Styles.popup_container} style={style}>
        <div className="container">
          <div className="ml-5 col-md-10 col-10">
            <div className={Styles.popup}>
              <h1>{title}</h1>
              {score && (
                <p>
                  You have completed the quiz. <br /> You got:{" "}
                  <strong>
                    {" "}
                    {score}
                    <strong> out of </strong> {total}
                  </strong>{" "}
                  questions right.
                </p>
              )}
              {text && <p>{text}</p>}
              {tagline && <p>{tagline}</p>}
              <span onClick={popupHandle}>
                <MyButton
                  text={buttonText}
                  bck="#3F9256"
                  color="#fff"
                ></MyButton>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Popup;
