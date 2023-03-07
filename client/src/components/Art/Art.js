import React, { Component, useContext, useEffect } from "react";
import styles from "../Art/Art.module.css";
import { render } from "react-dom";
import { useState } from "react";
import { months } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { faHeart, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../utils/useFetch";
import { useQuery } from "react-query";
import ArtView from "../ArtView/ArtView";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
Modal.setAppElement("#root");

const Art = ({ arts, updateArts }) => {
  const { user } = useContext(AuthContext);
  // console.log(user);

  const [artData, setArtData] = useState(
    arts.map((art) => {
      return {
        ...art,
        likeCount: art.data.likes.length,
        isLiked: art.data.likes.includes(user?._id),
      };
    })
  );

  useEffect(() => {
    setArtData(
      arts.map((art) => {
        return {
          ...art,
          likeCount: art.data.likes.length,
          isLiked: art.data.likes.includes(user?._id),
        };
      })
    );
  }, [arts]);

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

  const [viewArt, setViewArt] = useState(false);
  const openArt = async (art) => {
    setViewArt(true);
    try {
      const artObj = art;
      artObj.data.views += 1;
      setArtInfo(artObj);
      await axios.put(`/art/views/${art.data._id}`);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const closeArt = () => {
    setArtInfo({});
    setViewArt(false);
  };

  const customstyless = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      background: "#D4F1E0",

      transform: "translate(-50%, -50%)",
      height: "520px",
      backdropFilter: "blur(1.4px)",
      width: "320px",
      borderRadius: "16px",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    },
  };

  const getArtDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth(); // getMonth() returns month from 0 to 11
    const year = date.getFullYear();

    const str = `${day}-${months[month]}-${year}`;
    return str;
  };

  const handleLikeClick = async (artid) => {
    try {
      let currArt = false;
      setArtData(
        artData.map((art) => {
          if (art.data._id === artid) {
            art.likeCount += art.isLiked ? -1 : 1;
            art.isLiked = !art.isLiked;
            currArt = art.isLiked;
          }
          return art;
        })
      );
      if (currArt) {
        await axios.put(`/art/likes/${artid}/${user._id}`);
      } else {
        await axios.put(`/art/dislikes/${artid}/${user._id}`);
      }
      await updateArts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `/art/${user._id}`,
        {
          title: title,
          description: description,
          url: url,
          artist: user._id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      await updateArts();
      closeModal();
      setIsSubmitDisabled(false);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const displayArts = artData.map((art) => {
    return (
      <a key={art.data._id} className={styles.card} href="#">
        <div
          className={styles.card__background}
          style={{
            backgroundImage: `url(${art.data.url})`,
          }}
          onClick={() => openArt(art)}
        ></div>
        <div className={styles.card__content}>
          <p className={styles.card__category}>{art.data.title}</p>
          <div className={styles.bottom}>
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
                <FontAwesomeIcon
                  onClick={(e) => {
                    e.preventDefault();
                    handleLikeClick(art.data._id);
                  }}
                  icon={faHeart}
                  className={art.isLiked ? styles.liked : styles.unliked}
                  size="2x"
                />
                <p className={styles.count}>{art.likeCount}</p>
              </div>
              <div className={styles.iconClass}>
                <FontAwesomeIcon icon={faEye} size="2x" />
                <p className={styles.count}>{art.data.views}</p>
              </div>
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
      <div className={styles.hero_section}>
        <div>
          <button className={styles.button_9}>
            <span onClick={openModal}>+ New Art</span>
          </button>
        </div>

        <div className={styles.card_grid}>{displayArts}</div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customstyless}
        contentLabel="New Art"
      >
        <div className={styles.modalHeader}>
          <p>Add a New Art</p>
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
          <div className={styles.box1}>
            <label for="description">Add Art Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="40"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.file}>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
            </div>
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
          <div className={styles.upload}>
            <p>Uploaded image will be displayed here</p>
            <img width="200" height="120" src={url} alt= "Uploaded Art" />
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

      {/* <Modal
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
                      className={
                        artInfo.isLiked ? styles.liked : styles.unliked
                      }
                      onClick={handleLikeClickForModal}
                      icon={faHeart}
                      size="2x"
                    ></FontAwesomeIcon>
                    <p className={styles.count}>
                      {artInfo?.data?.likes.length}
                    </p>
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
              <div className={styles.modalTitle}>
                <h3>{artInfo?.data?.title}</h3>
              </div>

              <div className={styles.art_img}>
                <img src={artInfo?.data?.url} />
              </div>
              <div className={styles.contentClass}>
                <p>{artInfo?.data?.description}</p>
              </div>
            </div>
          </>
        }
      </Modal> */}
      <ArtView
        viewArt={viewArt}
        closeArt={closeArt}
        art={artInfo}
        userid={user._id}
        updateArts={updateArts}
      />
    </React.Fragment>
  );
};

export default Art;
