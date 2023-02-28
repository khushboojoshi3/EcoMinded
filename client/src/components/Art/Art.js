import React from "react";
import styles from "../Art/Art.module.css";
import { render } from "react-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { faHeart, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../utils/useFetch";
import { useQuery } from "react-query";
import axios from "axios";
Modal.setAppElement("#root");



const Art = ({artData, updateArts}) => {
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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const [artInfo, setArtInfo] = useState({});
  // console.log(artInfo);
  const openModal = () => {
    
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  
  const [viewArt , setViewArt] = useState(false);
  const openArt = async (artid) => {
    setViewArt(true);
    try{
      const artObj = await axios.get(`/art/find/${artid}`);
      setArtInfo(artObj.data);
      console.log(artObj);
      // console.log(artInfo);
    }catch(err){
      console.log(err.response.data);
    }
  };
  const closeArt = () => {
    setArtInfo({});
    // console.log(artInfo);
    setViewArt(false);
  };

  const customstyless = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "550px",
      width: "450px",
    },
  };

  const getArtDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth(); // getMonth() returns month from 0 to 11
    const year = date.getFullYear();
    const arr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const str = `${day}-${arr[month]}-${year}`;
    return str;
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "/art/63f8661ffebeaf2c928772c7",
        {
          title: title,
          description: description,
          url: url,
          artist: "63f8661ffebeaf2c928772c7",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // navigate("")
      await updateArts();
      closeModal();
      setIsSubmitDisabled(false);
    } catch (err) {
      console.log(err.response.data);
    }
  };

    const displayArts = artData.map((art) => {
      return (
        <a key={art.data._id} className={styles.card} href="#" onClick={() => openArt(art.data._id)}>
          <div
            className={styles.card__background}
            style={{
              backgroundImage: `url(${art.data.url})`,
            }}
          ></div>
          <div className={styles.card__content}>
            <p className={styles.card__category}>{art.data.title}</p>
            <div className={styles.bottom}></div>
            <div className={styles.post_metadata}>
              <img
                alt=""
                className={styles.avatar_image}
                src={art.artist.photo}
                height="40"
                width="40"
              />
              <div className={styles.post_info}>
                <div data-react-className={styles.PopoverLink}>
                  <span className={styles.popover_link} data-reactroot="">
                    <a href={`/profile/${art.artist.id}`}>{art.artist.name}</a>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.icon}>
              <div className={styles.iconClass}>
                <FontAwesomeIcon icon={faHeart} size="2x" />
                <p className={styles.count}>{art.data.likes}</p>
              </div>
              <div className={styles.iconClass}>
                <FontAwesomeIcon icon={faEye} size="2x" />
                <p className={styles.count}>{art.data.views}</p>
              </div>
            </div>
          </div>
        </a>
      );
    });
    return (
      <React.Fragment>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
          rel="stylesheet"
        ></link>
        <section className={styles.hero_section}>
          <div className={styles.buttonGrid}>
            <button className={styles.button_9} role="button">
              <span onClick={openModal} className={styles.text}>
                + New Art
              </span>
            </button>
          </div>

          <div className={styles.card_grid}>{displayArts}</div>
        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customstyless}
          contentLabel="New Art"
        >
          <div className={styles.modalHeader}>
            <div>Add a New Art</div>
            <div className={styles.close}>
              <button onClick={closeModal}>close</button>
            </div>
          </div>
          <form
            className={styles.newBillForm}
            onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitDisabled(true);
              handleSubmit();
            }}
          >
            <div>Add Title</div>
            <input
              type="text"
              required
              value={title}
              placeholder="Title..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <label for="description">Add Art Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="40"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
              >
                Upload
              </button>
            </div>
            <div>
              Uploaded image will be displayed here
              <img width="200" height="180" src={url} />
            </div>
            <input
              type="submit"
              id={styles.submitBtn}
              className={
                isSubmitDisabled ? styles.submitDisabled : styles.submitEnabled
              }
              disabled={isSubmitDisabled}
            />
          </form>
        </Modal>

        <Modal
          isOpen={viewArt}
          onRequestClose={closeArt}
          style={customstyless}
          contentLabel="Viewing Art"
        >
          {
            <>
              <div className={styles.modalHeader}>
                <div>You can view art here</div>
                <div className={styles.close}>
                  <button onClick={closeArt}>close</button>
                </div>
              </div>
              <div className={styles.infoHeader}>
                <div className={styles.post_metadata_modal}>
                  <img
                    alt=""
                    className={styles.avatar_image}
                    src={artInfo?.artist?.photo}
                    height="40"
                    width="40"
                  />
                  <div className={styles.post_info}>
                    <div data-react-className={styles.PopoverLink}>
                      <span className={styles.popover_link} data-reactroot="">
                        <a href={`/profile/${artInfo?.artist?.id}`}>
                          {artInfo?.artist?.name}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`${styles.post_stats} ${styles.clearfix}`}>
                  <div className={styles.pull_right}>
                    <div className={styles.iconClass}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        size="2x"
                      ></FontAwesomeIcon>
                      <p className={styles.count}>{artInfo?.data?.likes}</p>
                    </div>
                    <div className={styles.iconClass}>
                      <FontAwesomeIcon icon={faEye} size="2x" />
                      <p className={styles.count}>{artInfo?.data?.views}</p>
                    </div>
                  </div>

                  <div className={styles.pull_left}>
                    <p>{getArtDate(artInfo?.data?.createdAt)}</p>
                  </div>
                </div>
              </div>
              <div className={styles.singleArt}>
                <div>
                  <h3>{artInfo?.data?.title}</h3>
                </div>

                <div className={styles.art_img}>
                  <img width="300" height="200" src={artInfo?.data?.url} />
                </div>
                <div className={styles.contentClass}>
                  <p>{artInfo?.data?.description}</p>
                </div>
              </div>
            </>
          }
        </Modal>
      </React.Fragment>
    );
};

export default Art;