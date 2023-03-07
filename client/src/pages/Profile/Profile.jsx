import { useState,useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Header from "../../components/Header/Header";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import { Label,Pivot, PivotItem } from "@fluentui/react";
import { FaCamera } from "react-icons/fa";
import Art from "../../components/Art/Art";
import Feed  from "../../components/Feed/Feed";
import Modal from "react-modal";
Modal.setAppElement("#root");
const labelStyles = {
  root: { marginTop: 5, backgroundColor: "white" },
};

function Profile() {
    const { user } = useContext(AuthContext);

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const uploadImage = () => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ecoMinded");
      data.append("cloud_name", "drclthcb6");
      fetch("  https://api.cloudinary.com/v1_1/drclthcb6/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUrl(data.url);
        })
        .catch((err) => console.log(err));
    };
    const customstyless = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        border:"2px solid white",
        marginRight: "-50%",
        background:"linear-gradient(103.56deg, #C5E9EB 0.51%, #E2CFE2 51.23%, #D9D3DE 75.78%, rgba(103, 27, 104, 0) 105.23%)",
        transform: "translate(-50%, -50%)",
        height: "400px",
        width: "320px",
      },
    };
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => {
      setIsOpen(false);
    };
    const { data, isLoading, error , refetch} = useQuery("user", () => {
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

     const handleSubmit = async () => {
       try {
         await axios.put(
           `/user/${user._id}`,
           {
             photo: url,
           },
           {
             headers: { "Content-Type": "application/json" },
           }
         );
         await refetch();
         closeModal();
         setIsSubmitDisabled(false);
       } catch (err) {
         console.log(err.response.data);
       }
     };

    return (
      <>
        <Header />
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
                    <div onClick={openModal}>
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
            </div>
            <Pivot aria-label="User Info" className={styles.pivots}>
              {user._id === id && (
                <PivotItem headerText="Personal Information">
                  {/* <PersonalInfo /> */}
                </PivotItem>
              )}
              <PivotItem headerText="Art">
                {errArt ? (
                  "An error occured"
                ) : isLoadingArt ? (
                  "Loading"
                ) : (
                  <Label styles={labelStyles}>
                    <Art updateArts={fetchUpdatedArts} arts={arts?.data} />
                  </Label>
                )}
              </PivotItem>
              <PivotItem headerText="Blogs">
                {errBlog ? (
                  "An error occured"
                ) : isLoadingBlog ? (
                  "Loading"
                ) : (
                  <Feed updateBlogs={fetchUpdatedBlogs} blogs={blogs?.data} />
                )}
              </PivotItem>
              {user._id === id && (
                <PivotItem headerText="My ClaimedRewards"></PivotItem>
              )}
            </Pivot>
          </>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customstyless}
          contentLabel="New Profile Photo"
        >
          <div className={styles.modalHeader}>
            <p>Add a New Profile Photo</p>
            {/* <div className={styles.close}>
              <button onClick={closeModal}>close</button>
            </div> */}
          </div>
          <form
            className={styles.newBillForm}
            onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitDisabled(true);
              handleSubmit();
            }}
          >
    
            <div>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  uploadImage();
                }}
                className={styles.uploadButton}
              >
                Upload
              </button>
            </div>
            <div className={styles.info}>
              Uploaded image will be displayed here
              <img width="200" height="120" src={url} />
            </div>
            <div className={styles.submit}>
            <input
              type="submit"
              id={styles.submitBtn}
              className={
                isSubmitDisabled ? styles.submitDisabled : styles.submitEnabled
              }
              disabled={isSubmitDisabled}
            />
            </div>
          </form>
        </Modal>
      </>
    );
}
export default Profile;