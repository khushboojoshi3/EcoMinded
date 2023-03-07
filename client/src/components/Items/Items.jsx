import Style from "./Items.module.css";
import { TfiRulerPencil } from "react-icons/tfi";
import { GiSofa, GiConverseShoe} from "react-icons/gi";
import { IoShirtOutline } from "react-icons/io5";
function Items({ formData, setFormData }) {
    const updateItem = (value, idx) => {
        const arr = formData.items;
        arr[idx].qty = parseFloat(value);
        setFormData({ ...formData, items: arr });
    }
    return (
      <div className={Style.items}>
        <div>
          <label>
            <IoShirtOutline className={Style.icons} />
            Clothes
          </label>
          <p>
            <input
              type="number"
              value={formData.items[0].qty}
              step=".01"
              onChange={(e) => updateItem(e.target.value, 0)}
            />{" "}
            Kg
          </p>
        </div>
        <div>
          <label>
            <GiConverseShoe className={Style.icons} />
            Footwear
          </label>
          <p>
            <input
              type="number"
              value={formData.items[1].qty}
              step=".01"
              onChange={(e) => updateItem(e.target.value, 1)}
            />{" "}
            Kg
          </p>
        </div>
        <div>
          <label>
            <GiSofa className={Style.icons} />
            Furniture
          </label>
          <p>
            <input
              type="number"
              value={formData.items[2].qty}
              step=".01"
              onChange={(e) => updateItem(e.target.value, 2)}
            />{" "}
            Kg
          </p>
        </div>
        <div>
          <label>
            <TfiRulerPencil className={Style.icons} />
            Stationery
          </label>
          <p>
            <input
              type="number"
              value={formData.items[3].qty}
              step=".01"
              onChange={(e) => updateItem(e.target.value, 3)}
            />{" "}
            Kg
          </p>
        </div>
      </div>
    );
}
export default Items;