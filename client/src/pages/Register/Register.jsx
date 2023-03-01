import { useState } from "react";
import Style from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import congrats from "../../assets/congrats.gif";
Modal.setAppElement("#root");
function Register() {
  const [credentials, setCredentials] = useState({
    fname: undefined,
    lname: undefined,
    username: undefined,
    email: undefined,
    mobileNo: undefined,
    password:undefined
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
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
       position:"relative"
     },
  };
  const openModal = () => {
     setIsOpen(true);
   };
  const closeModal = () => {
     setIsOpen(false);
  };
  
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async () => {
    try {
      await axios.post("/auth/register", credentials, {
        headers: { "Content-Type": "application/json" },
      });
      setIsSubmitDisabled(false);
      setCredentials({ fname: "", lname: "", username: "", email: "", mobileNo: "", password: "" });
      openModal();
    } catch (err) {
      setError(err.response.data);
      setIsSubmitDisabled(false);
    }
  };
  return (
    <>
      <div className={Style.main}>
        <div className={Style.form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitDisabled(true);
              handleSubmit();
            }}
          >
            <label>First Name</label>
            <input
              type="text"
              id="fname"
              value={credentials.fname}
              onChange={handleChange}
            />
            <label>Last Name</label>
            <input
              type="text"
              id="lname"
              value={credentials.lname}
              onChange={handleChange}
            />
            <label>User Name</label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
            />
            <label>Mobile Number</label>
            <input
              type="tel"
              pattern="[1-9]{1}[0-9]{9}"
              id="mobileNo"
              value={credentials.mobileNo}
              onChange={handleChange}
              placeholder="1234567890"
            />
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
            />
            {error && <span>{error.message}</span>}
            <input
              id={Style.submit}
              type="submit"
              disabled={isSubmitDisabled}
              style={
                isSubmitDisabled
                  ? {
                      backgroundColor: "#5DBB63",
                    }
                  : {}
              }
            />
          </form>
        </div>
        <div className={Style.img}></div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className={Style.congrats}>
          <p>
            Congratulations! 🥳 you have successfully registered to be an
            Eco-Warrior.
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              closeModal();
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </Modal>
    </>
  );
}
export default Register;
