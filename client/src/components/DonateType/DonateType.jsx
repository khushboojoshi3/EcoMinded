import Style from "./DonateType.module.css";
function DonateType({ formData, setFormData }) {
    return (
      <div>
        <div className={Style.radio}>
          <input
            type="radio"
            value="self"
            name="type"
            required
            checked={formData.pickupType === "self"}
            onChange={(e) =>
              setFormData({ ...formData, pickupType: e.target.value })
            }
          />
          <label>Drop Yourself </label>
        </div>
        <div className={Style.radio}>
          <input
            type="radio"
            value="doorstep"
            name="type"
            checked={formData.pickupType === "doorstep"}
            onChange={(e) =>
              setFormData({ ...formData, pickupType: e.target.value })
            }
          />
          <label>Pickup from your doorstep </label>
        </div>
      </div>
    );
}
export default DonateType;