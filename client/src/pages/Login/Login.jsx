import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      <div>
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
          <input disabled={loading} type="submit" />
        </form>
      </div>
    );
}
export default Login;