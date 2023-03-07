import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { HiPencil } from "react-icons/hi";
import axios from "axios";
import Style from "./PersonalInfo.module.css";
function PersonalInfo({refetchData}) {
  const [disabled, setDisabled] = useState(true);
  const { user,dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: user.username,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    mobileNo:user.mobileNo
  });
  const [err, setErr] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const updateUserInfo = async() => {
    try {
      const newUser = await axios.put(`/user/${user._id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: "UPDATE_USER", payload: newUser.data });
      await refetchData();
      setDisabled(true);
      setIsSubmitDisabled(false);
    } catch (err) {
      setErr(err.response.data);
      setIsSubmitDisabled(false);
    }
  }
  return (
    <div className={Style.personalInfo}>
      <form
        className={Style.form}
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitDisabled(false);
          updateUserInfo();
        }}
      >
        <div className={Style.edit}>
          <div className={Style.heading}>Edit Your Information</div>
          <div>
            <HiPencil
              className={Style.pencil}
              onClick={() => setDisabled(!disabled)}
            />
          </div>
        </div>
        <fieldset disabled={disabled}>
          <label>User Name</label>
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <label>First Name</label>
          <input
            type="text"
            required
            value={formData.fname}
            onChange={(e) =>
              setFormData({ ...formData, fname: e.target.value })
            }
          />
          <label>Last Name</label>
          <input
            type="text"
            value={formData.lname}
            onChange={(e) =>
              setFormData({ ...formData, lname: e.target.value })
            }
          />
          <label>Email</label>
          <input
            type="text"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label>Mobile Number</label>
          <input
            type="tel"
            pattern="[1-9]{1}[0-9]{9}"
            id="mobileNo"
            required
            value={formData.mobileNo}
            onChange={(e) =>
              setFormData({ ...formData, mobileNo: e.target.value })
            }
            placeholder="1234567890"
          />
          {err && <p>{err}</p>}
          <input
            type="submit"
            value="Update"
            disabled={isSubmitDisabled}
            className={`${Style.submit} ${
              isSubmitDisabled ? Style.submitDisabled : ""
            }`}
          />
        </fieldset>
      </form>
    </div>
  );
}
export default PersonalInfo;
