import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Header from "../../components/Header/Header";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import { Pivot, PivotItem } from "@fluentui/react";
import { FaCamera } from "react-icons/fa";
import Art from "../../components/Art/Art";
import Feed  from "../../components/Feed/Feed";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
function Profile() {
    const { user } = useContext(AuthContext);
    const { data, isLoading, error } = useQuery("user", () => {
      return axios.get(`/user/${user._id}`);
    });
    const { id } = useParams();
    const {
      data: arts,
      isLoading: isLoadingArt,
      error: errArt,
      refetch:refetchArt
    } = useQuery(
      "user_art",
      () => {
        return axios.get(`/user/art/${id}`);
      },
      { refetchInterval: 120000 }
    );
    const {
      data: blogs,
      isLoading: isLoadingBlog,
      error: errBlog,
      refetch:refetchBlog
    } = useQuery(
      "user_blog",
      () => {
        return axios.get(`/user/blogs/${id}`);
      },
      { refetchInterval: 120000 }
    );
     const fetchUpdatedBlogs = async () => {
       await refetchBlog();
     };
     const fetchUpdatedArts = async () => {
       await refetchArt();
     };
    return (
      <>
        <Header />
        <div>
          {error ? (
            "An error occured"
          ) : isLoading ? (
            "Loading"
          ) : (
            <>
              <div className={styles.profile}>
                <div className={styles.userMain}>
                  <div className={styles.userInfo}>
                    <div className={styles.userImage}>
                      <div
                        className={styles.avatar}
                        style={{
                          backgroundImage: `url(${data.data.photo})`,
                          backgroundSize: "cover",
                        }}
                      />
                      <div>
                        <FaCamera />
                      </div>
                    </div>
                    <div className={styles.userName}>
                      <p>@{data.data.username}</p>
                      <p>
                        {data.data.fname} {data.data.lname}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.information}>
                  <Pivot aria-label="User Info" className={styles.pivots}>
                    {user._id === id && (
                      <PivotItem headerText="Personal Information">
                        <PersonalInfo />
                      </PivotItem>
                    )}
                    <PivotItem headerText="Art">
                      {errArt ? (
                        "An error occured"
                      ) : isLoadingArt ? (
                        "Loading"
                      ) : (
                        <Art updateArts={fetchUpdatedArts} arts={arts?.data} />
                      )}
                    </PivotItem>
                    <PivotItem headerText="Blogs">
                      {errBlog ? (
                        "An error occured"
                      ) : isLoadingBlog ? (
                        "Loading"
                      ) : (
                        <Feed
                          updateBlogs={fetchUpdatedBlogs}
                          blogs={blogs?.data}
                        />
                      )}
                    </PivotItem>
                    {user._id === id && (
                      <PivotItem headerText="My ClaimedRewards"></PivotItem>
                    )}
                  </Pivot>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
}
export default Profile;