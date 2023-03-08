import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DonateType from "../../../components/DonateType/DonateType";
import DonatorInfo from "../../../components/DonatorInfo/DonatorInfo";
import Header from "../../../components/Header/Header";
import Items from "../../../components/Items/Items";
import { AuthContext } from "../../../context/AuthContext";
import Style from "./DonateForm.module.css";
function DonateForm() {
    const [page, setPage] = useState(0);
    const formTitles = ["How do you wish to donate?", "Donator's Info","Pick your donation items"]
    const [formData, setFormData] = useState({
      pickupType: "self",
      items: [
        { name: "clothes", qty: null },
        { name: "footwear", qty: null },
        { name: "furniture", qty: null },
        { name: "stationery", qty: null },
      ],
      date: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
      },
      timeSlot: "",
      charges: 0,
    });
    const [err, setErr] = useState(null);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const elements = [
      <DonateType formData={formData} setFormData={setFormData} />,
      <DonatorInfo formData={formData} setFormData={setFormData} />,
      <Items formData={formData} setFormData={setFormData} />,
    ];
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const getWidth = () => {
        if (page === 0) {
            if (formData.pickupType === "self") {
              return "50%";
            } else {
              return "33.3%";
            }
        } else if (page === 1) {
            return "66.6%";
        } else {
            return "100%";
        }
    }
    const validCharge = () => {
      if (formData.charges === 0)
        return true;
      let totalQty = 0;
      for (let i = 0; i < 4; i++){
        if (formData.items[i].qty !== null) {
          totalQty += formData.items[i].qty;
        }
      }
      if (formData.charges === 199) {
        return totalQty < 20;
      } else if (formData.charges === 699) {
        return totalQty <25;
      }
      return true;
    }
    const handleSubmit = async () => {
        const isValid = (formData.items.some((item) => item.qty !== null)) && validCharge();
        if (!isValid) {
            setErr("Please pick your donation items and add valid quantity.");
            setIsSubmitDisabled(false);
        } else {
            try {
              await axios.post(`/donate/${user._id}`, formData, {
                headers: { "Content-Type": "application/json" },
              });
              navigate("/donate");
              setIsSubmitDisabled(false);
            } catch (err) {
              setErr(err.response.data);
              setIsSubmitDisabled(false);
            }
        }
    }
    return (
      <>
        <Header />
        <div className={Style.main}>
          <div className={Style.form}>
            <div className={Style.progressBar}>
              <div style={{ width: getWidth() }}></div>
            </div>
            <div className={Style.formcontainer}>
              <div className={Style.header}>{formTitles[page]}</div>
              <div className={Style.body}>{elements[page]}</div>
              {err && <p className={Style.err}>{err}</p>}
              <div className={Style.footer}>
                <button
                  className={`${Style.button} ${Style.prev}`}
                  disabled={page === 0}
                  onClick={() => {
                    if (page === 2) {
                      if (formData.pickupType === "self") {
                        setPage((cur) => cur - 2);
                      } else {
                        setPage((cur) => cur - 1);
                      }
                    } else {
                      setPage((cur) => cur - 1);
                    }
                  }}
                >
                  Prev
                </button>
                <button
                  className={`${Style.button} ${Style.next} ${isSubmitDisabled?Style.submitDisabled:''}`}
                  disabled={isSubmitDisabled}
                  onClick={(e) => {
                    if (page === formTitles.length - 1) {
                        e.preventDefault();
                        setIsSubmitDisabled(true);
                        handleSubmit();
                    } else {
                      if (page === 0) {
                        if (formData.pickupType === "self") {
                          setPage((cur) => cur + 2);
                        } else {
                          setPage((cur) => cur + 1);
                        }
                      } else {
                        setPage((cur) => cur + 1);
                      }
                    }
                  }}
                >
                  {page === formTitles.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
export default DonateForm;