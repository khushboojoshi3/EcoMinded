import { useContext, useState } from "react";
import { useQuery } from "react-query";
import Header from "../../components/Header/Header";
import Style from "./Electricity.module.css";
import axios from "axios";
import { Graph } from "../../components/Graph/Graph";
import { getFormattedDate, getYears } from "../../utils/date";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "react-modal";
import { avgMonthWiseConsumption } from "../../utils/consumption";
import { getTips } from "../../utils/tips";
import { AuthContext } from "../../context/AuthContext";
Modal.setAppElement("#root");
function Electricity() {
  const { user, dispatch } = useContext(AuthContext);
  const { data, isLoading, error, refetch } = useQuery("bill", () => {
    return axios.get(`/user/electricityBills/${user._id}`);
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [units, setUnits] = useState(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    "" + new Date().getFullYear()
  );
  const [err, setErr] = useState(null);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "400px",
      width: "400px",
    },
  };
  const getGraphData = () => {
    const arr = new Array(12);
    arr.fill({ from: "", to: "", units: "0", co2e: "0" });
    data?.data?.forEach((bill) => {
      const date = getFormattedDate(bill.from);
      const year = date.substring(0, 4);
      const month = parseInt(date.substring(5, 7));
      if (year === selectedYear) {
        arr[month - 1] = {
          from: date,
          to: getFormattedDate(bill.to),
          units: bill.units,
          co2e: parseFloat(bill.co2e).toFixed(2),
        };
      }
    });
    return arr;
  };
  const getDataBasedOnYear = () => {
    const arr = [];
    if (data === undefined) return [];
    data.data.forEach((bill) => {
      const date = getFormattedDate(bill.from);
      const year = date.substring(0, 4);
      if (year === selectedYear) {
        arr.push({
          from: date,
          to: getFormattedDate(bill.to),
          units: bill.units,
          co2e: parseFloat(bill.co2e).toFixed(2),
        });
      }
    });
    return arr;
  };
  const getZone = () => {
    const arr = getDataBasedOnYear();
    if (arr.length === 0)
      return (
        <div className={`${Style.zone} ${Style.yellow}`}>
          <p>Yellow Zone</p>
          <p>Carbon Dioxide Equivalent: 0</p>
          <p>Ideal Consumption: depends on month</p>
          <p>You carbon consumption is 0% is more than average user</p>
        </div>
      );
    const lastBill = arr[arr.length - 1];
    let month = parseInt(lastBill.from.substring(5, 7));
    const stand = (
      (Math.abs(avgMonthWiseConsumption[month - 1][0] - lastBill.units) /
        avgMonthWiseConsumption[month - 1][0]) *
      100
    ).toFixed(2);
    if (lastBill.units < avgMonthWiseConsumption[month - 1][0]) {
      return (
        <div className={`${Style.zone} ${Style.green}`}>
          <p>Green Zone</p>
          <p>Carbon Dioxide Equivalent: {lastBill.co2e}</p>
          <p>
            Ideal Consumption: {avgMonthWiseConsumption[month - 1][0]}-
            {avgMonthWiseConsumption[month - 1][1]} units
          </p>
          <p>You carbon consumption is {stand}% less than average user</p>
        </div>
      );
    } else if (
      lastBill.units >= avgMonthWiseConsumption[month - 1][0] &&
      lastBill.units < avgMonthWiseConsumption[month - 1][1]
    ) {
      return (
        <div className={`${Style.zone} ${Style.yellow}`}>
          <p>Yellow Zone</p>
          <p>Carbon Dioxide Equivalent: {lastBill.co2e}</p>
          <p>
            Ideal Consumption: {avgMonthWiseConsumption[month - 1][0]}-
            {avgMonthWiseConsumption[month - 1][1]} units
          </p>
          <p>You carbon consumption is {stand}% is more than average user</p>
        </div>
      );
    } else {
      return (
        <div className={`${Style.zone} ${Style.red}`}>
          <p>Red Zone</p>
          <p>Carbon Dioxide Equivalent: {lastBill.co2e}</p>
          <p>
            Ideal Consumption: {avgMonthWiseConsumption[month - 1][0]}-
            {avgMonthWiseConsumption[month - 1][1]} units
          </p>
          <p>You carbon consumption is {stand}% is more than average user</p>
        </div>
      );
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleSubmit = async () => {
    try {
      await axios.post(
        `/electricityBill/${user._id}`,
        {
          from: from,
          to: to,
          units: units,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const updated_user = await axios.get(`user/${user._id}`);
      dispatch({ type: "UPDATE_USER", payload: updated_user.data });
      await refetch();
      closeModal();
      setIsSubmitDisabled(false);
    } catch (err) {
      setErr(err.response.data);
      setIsSubmitDisabled(false);
    }
  };
  return (
    <>
      <Header />
      <div className={Style.electricity}>
        <section className={Style.main}>
          <div>
            {error ? (
              "An error occured"
            ) : isLoading ? (
              "Loading"
            ) : (
              <>
                <select
                  value={selectedYear}
                  className={Style.selection}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                  }}
                >
                  {getYears().map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
                <div className={Style.visualization}>
                  <div className={Style.graph}>
                    {data.data.length === 0 ? (
                      "Add your electricityBill to view the graph."
                    ) : (
                      <Graph graphData={getGraphData(data.data)} />
                    )}
                  </div>
                  {getZone()}
                </div>
              </>
            )}
          </div>
        </section>
        <section>
          <div className={Style.consumption}>
            <div className={Style.myconsumption}>
              <div className={Style.consumptionHeader}>
                <div>
                  <h1>Consumption History</h1>
                </div>
                <div className={Style.btn}>
                  <button className={Style.newBtn} onClick={() => openModal()}>
                    <AiOutlinePlus className={Style.plusIcon} /> New
                  </button>
                </div>
              </div>
              <div class={Style.history}>
                <div className={Style.colhead}>From</div>
                <div className={Style.colhead}>To</div>
                <div className={Style.colhead}>Units in Kwh</div>
                <div className={Style.colhead}>Co2e</div>
                {error
                  ? "An error occurred"
                  : isLoading
                  ? "Loading"
                  : getDataBasedOnYear().map((bill) => (
                      <>
                        <div>{bill.from}</div>
                        <div>{bill.to}</div>
                        <div>{bill.units}</div>
                        <div>{bill.co2e} </div>
                      </>
                    ))}
              </div>
            </div>
            <div className={Style.tips}>
              {getTips().map((tip) => (
                <p>{tip}</p>
              ))}
            </div>
          </div>
        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="New Bill"
        >
          <div className={Style.modalHeader}>
            <div>New Bill Form</div>
            <div className={Style.close}>
              <button onClick={closeModal}>close</button>
            </div>
          </div>
          <form
            className={Style.newBillForm}
            onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitDisabled(true);
              handleSubmit();
            }}
          >
            <div>From</div>
            <input
              type="date"
              required
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <div>To</div>
            <input
              type="date"
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <div>Units</div>
            <input
              type="number"
              required
              value={units === 0 ? "" : units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="0"
            />
            {err && <span>{err}</span>}
            <input
              type="submit"
              id={Style.submitBtn}
              className={
                isSubmitDisabled ? Style.submitDisabled : Style.submitEnabled
              }
              disabled={isSubmitDisabled}
            />
          </form>
        </Modal>
      </div>
    </>
  );
}
export default Electricity;
