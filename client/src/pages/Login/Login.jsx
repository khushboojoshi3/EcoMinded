import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Style from "./Login.module.css";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch, loading, error } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        dispatch({ type: "LOGIN_START" });
        try {
            const user = await axios.post(
              "/auth/login",
              {
                email: email,
                password: password,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            dispatch({ type: "LOGIN_SUCCESS", payload: user.data.details });
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE",payload:err.response.data });
        }
    }
    return (
      <div className={Style.main}>
        <div className={Style.form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p>{error.message}</p>}
            <input
              id={Style.submit}
              style={loading ? { backgroundColor: "#5DBB63" } : {}}
              disabled={loading}
              value="Submit"
              type="submit"
            />
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
        <div className={Style.img}></div>
      </div>
    );
}
export default Login;