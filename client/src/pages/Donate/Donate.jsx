import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Header from "../../components/Header/Header";
import { getFormattedDate } from "../../utils/date";
import Style from "./Donate.module.css";
function Donate() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { data, isLoading, error } = useQuery("pickup", () => {
       return axios.get(`/user/donations/${user._id}`);
     });
    return (
      <>
        <Header />
        <div className={Style.donate}>
          <div className={Style.hero}>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/donateform");
              }}
            >
              Book a Pickup!
            </button>
          </div>
          <div className={Style.pickups}>
            <h2>My Pickups</h2>
            {error ? (
              "An error occured"
            ) : isLoading ? (
              "Loading"
            ) : (
              <table>
                <tbody>
                  <colgroup>
                    <col span={1} style={{ width: "23%" }} />
                    <col span={1} style={{ width: "50%" }} />
                    <col span={1} style={{ width: "27%" }} />
                  </colgroup>
                  <tr>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Status</th>
                  </tr>

                  {data.data.map((pickup) => {
                    const timestamp =
                      parseInt(pickup._id.toString().substring(0, 8), 16) *
                      1000;
                    return (
                      <tr>
                        <td>{getFormattedDate(timestamp)}</td>
                        <td>
                          {pickup.items.map((item) => (
                            <p>
                              <span>{item.name}</span>
                              <span className={Style.tags}>{item.qty} Kg</span>
                              <span className={Style.tags}>
                                {parseFloat(item.co2e).toFixed(2)} co2e
                              </span>
                            </p>
                          ))}
                        </td>
                        <td>{pickup.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </>
    );
}
export default Donate;