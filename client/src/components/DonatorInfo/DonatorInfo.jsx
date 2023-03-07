import { cities, states } from "../../utils/location";
import Style from "./DonatorInfo.module.css";
function DonatorInfo({ formData, setFormData }) {
    return (
      <div>
        <div className={Style.address}>
          <label>Address Line 1</label>
          <input
            type="text"
            value={formData.address.addressLine1}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  addressLine1: e.target.value,
                },
              })
            }
          />
          <label>Address Line 2</label>
          <input
            type="text"
            value={formData.address.addressLine2}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  addressLine2: e.target.value,
                },
              })
            }
          />
          <label>City</label>
          <input
            list="cities"
            value={formData.address.city}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  city: e.target.value,
                },
              })
            }
          />
          <datalist id="cities">
            {cities.map((city) => (
              <option value={city}>{city}</option>
            ))}
          </datalist>
          <label>State</label>
          <input
            list="states"
            value={formData.address.state}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  state: e.target.value,
                },
              })
            }
          />
          <datalist id="states">
            {states.map((state) => (
              <option value={state}>{state}</option>
            ))}
          </datalist>
          <label>Pincode</label>
          <input
            type="text"
            value={formData.address.pincode}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  pincode: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div>
          <p>Choose Your TimeSlot</p>
          <div className={Style.radio}>
            <input
              type="radio"
              value="10:00AM-12:00PM"
              name="slot"
              required
              checked={formData.timeSlot === "10:00AM-12:00PM"}
              onChange={(e) =>
                setFormData({ ...formData, timeSlot: e.target.value })
              }
            />
            <label>10:00 AM - 12:00 PM</label>
          </div>
          <div className={Style.radio}>
            <input
              type="radio"
              value="12:00PM-2:00PM"
              name="slot"
              checked={formData.timeSlot === "12:00PM-2:00PM"}
              onChange={(e) =>
                setFormData({ ...formData, timeSlot: e.target.value })
              }
            />
            <label>12:00 PM - 2:00 PM</label>
          </div>
          <div className={Style.radio}>
            <input
              type="radio"
              value="2:00PM-4:00PM"
              name="slot"
              checked={formData.timeSlot === "2:00PM-4:00PM"}
              onChange={(e) =>
                setFormData({ ...formData, timeSlot: e.target.value })
              }
            />
            <label>2:00 PM - 4:00 PM</label>
          </div>
        </div>
        <div className={Style.pickupCharge}>
          <p>PickUp Charges</p>
          <div className={Style.radio}>
            <input
              type="radio"
              value="199"
              name="charges"
              required
              checked={formData.charges === 199 }
              onChange={(e) =>
                setFormData({ ...formData, charges: parseInt(e.target.value) })
              }
            />
            <label>
              Light Pickup <span>&#60; 20kg</span> <span>₹199</span>
            </label>
          </div>
          <div className={Style.radio}>
            <input
              type="radio"
              value="699"
              name="charges"
              checked={formData.charges === 699}
              onChange={(e) =>
                setFormData({ ...formData, charges: parseInt(e.target.value) })
              }
            />
            <label>
              Medium Pickup <span>20 kg - 25 kg</span> <span>₹699</span>
            </label>
          </div>
          <div className={Style.radio}>
            <input
              type="radio"
              value="3500"
              name="charges"
              checked={formData.charges === 3500 }
              onChange={(e) =>
                setFormData({ ...formData, charges: parseInt(e.target.value) })
              }
            />
            <label>
              Collection Drive Pickup <span>₹3500</span>
            </label>
          </div>
        </div>
      </div>
    );
}
export default DonatorInfo;