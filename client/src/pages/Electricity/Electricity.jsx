import { useState } from "react";
import { useQuery } from "react-query";
import  Header  from "../../components/Header/Header";
import Style from "./Electricity.module.css";
import axios from "axios";
import { Graph } from "../../components/Graph/Graph";
import { getFormattedDate, getYears } from "../../utils/date";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "react-modal";
import { avgMonthWiseConsumption } from "../../utils/consumption";
Modal.setAppElement("#root");
export function Electricity() {
    const { data, isLoading, error,refetch } = useQuery("bill", () => {
        return axios.get("/user/electricityBills/63ef7362c9452cb5ef991f59");
    });
    const [modalIsOpen, setIsOpen] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [units, setUnits] = useState(0);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [selectedYear,setSelectedYear]=useState(""+new Date().getFullYear());
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        height: "400px",
        width:"400px"
      },
    };
    const getGraphData = () => {
      const arr = new Array(12);
      arr.fill({from:"",to:"",co2e:"0"});
      data?.data?.forEach((bill) => {
        const date = getFormattedDate(bill.from);
        const year = date.substring(0, 4);
        const month = parseInt(date.substring(5, 7));
        if (year === selectedYear) {
          arr[month-1] = { from:date,to:getFormattedDate(bill.to),units:bill.units,co2e:bill.co2e };
        }
      });
      return arr; 
    }
    const getDataBasedOnYear=(cyear)=>{
      const arr=[];
      if(data===undefined)
      return [];
       data.data.forEach((bill) => {
         const date = getFormattedDate(bill.from);
         const year = date.substring(0, 4);
         if (year === cyear) {
           arr.push({
             from: date,
             to: getFormattedDate(bill.to),
             units: bill.units,
             co2e: bill.co2e,
           });
         }
       });
       return arr; 
    }
    const [dataBasedOnYear,setDataBasedOnYear]=useState(getDataBasedOnYear(selectedYear));
    const getZone=()=>{
      const lastBill=dataBasedOnYear[dataBasedOnYear.length-1];
      if(lastBill===undefined)
        return { type: "Yellow", avg: "varies according to month", stand: 0 };
      let month = parseInt(lastBill.from.substring(5, 7));
       const stand =
         (Math.abs(avgMonthWiseConsumption[month - 1] - lastBill.units) /
           avgMonthWiseConsumption[month - 1]) *
         100;
      if (lastBill.units < avgMonthWiseConsumption[month - 1][0]) {
        return ([
          <p>Green Zone</p>,
          <p>Carbon Dioxide Equivalent {lastBill.co2e}</p>,
          <p>`Avergae User: avgMonthWiseConsumption[month - 1][0]-avgMonthWiseConsumption[month - 1][1] units`</p>,
          <p>You carbon consumption is {stand}% less than average user</p>
        ]);
      }else if (
        lastBill.units >= avgMonthWiseConsumption[month - 1][0] &&
        lastBill.units < avgMonthWiseConsumption[month - 1][1]
      ) {
        return (
          [
            <p>Yellow Zone</p>,
            <p>Carbon Dioxide Equivalent {lastBill.co2e}</p>,
            <p>
              `Avergae User: avgMonthWiseConsumption[month -
              1][0]-avgMonthWiseConsumption[month - 1][1] units`
            </p>,
            <p>You carbon consumption is {stand}% is more than average user</p>
          ]
        );
      } else {
       return (
         [
           <p>Red Zone</p>,
           <p>Carbon Dioxide Equivalent {lastBill.co2e}</p>,
           <p>
             `Avergae User: avgMonthWiseConsumption[month -
             1][0]-avgMonthWiseConsumption[month - 1][1] units`
           </p>,
           <p>You carbon consumption is {stand}% is more than average user</p>
         ]
       );
      }
    }
    const openModal = () => {
      setIsOpen(true);
    }
    const closeModal = () => {
      setIsOpen(false);
    }
    const handleSubmit = async () => {
      try {
        await axios.post("/electricityBill/63ef7362c9452cb5ef991f59", {
          from: from,
          to: to,
          units: units
        },
        {
          headers: { "Content-Type": "application/json" }
        });
        await refetch();
        closeModal();
        setIsSubmitDisabled(false);
      } catch (err) {
        console.log(err.response.data);
      }
    }
    return (
      <div className={Style.electricity}>
        <Header />
        <section className={Style.main}>
          <div className={Style.graph}>
            {error ? (
              "An error occured"
            ) : isLoading ? (
              "Loading"
            ) : (
              <>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setDataBasedOnYear(getDataBasedOnYear(e.target.value));
                  }}
                >
                  {getYears().map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
                <Graph graphData={getGraphData(data.data)} />
                {/* <div className={Style.zone}>
                  {getZone().map((child)=>child)}
                </div> */}
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
                  : dataBasedOnYear.map((bill) => (
                      <>
                        <div>{bill.from}</div>
                        <div>{bill.to}</div>
                        <div>{bill.units}</div>
                        <div>{parseFloat(bill.co2e).toFixed(2)} </div>
                      </>
                    ))}
              </div>
            </div>
            <div className={Style.tips}>Tips to reduce electricity</div>
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
    );
}
