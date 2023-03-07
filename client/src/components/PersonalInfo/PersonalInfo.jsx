import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { HiPencil } from "react-icons/hi";
import Style from "./PersonalInfo.module.css";
function PersonalInfo() {
  const [disabled, setDisabled] = useState(true);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState(user);
  return (
    <div className={Style.personalInfo}>
      <form className={Style.form}>
        <div>
            <p>Edit Your Information</p>
            <HiPencil onClick={ ()=>setDisabled(!disabled)} />
        </div>
        <fieldset disabled={disabled}>
          <label>User Name</label>
          <input
            type="text"
            value={formData.fname}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <label>First Name</label>
          <input
            type="text"
            value={formData.lname}
            onChange={(e) =>
              setFormData({ ...formData, fname: e.target.value })
            }
          />
          <label>Email</label>
          <input
            type="text"
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
            value={formData.mobileNo}
            onChange={(e) =>
              setFormData({ ...formData, mobileNo: e.target.value })
            }
            placeholder="1234567890"
          />
          <input type="submit" value="Update" className={Style.submit} />
        </fieldset>
      </form>
    </div>
  );
}
export default PersonalInfo;
