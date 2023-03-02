import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../Art/Art.module.css";
import { faHeart, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {getFormattedDate} from "../../utils/date";
import axios from "axios";
Modal.setAppElement("#root");

const ArtView = ({ viewArt, closeArt, art , userid, updateArts}) => {
  const customstyles = {
    content: {
      top: "60%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "500px",
      width: "400px",
    },
  };

  const [artInfo, setArtInfo] = useState(art);

  useEffect(() => {
    setArtInfo(art);
  },[art]);
  const handleLikeClickForModal = async () => {
    try {
      let currArt = false;
      const artid = artInfo?.data?._id;
      const artObj = artInfo;
      // console.log(artObj);
      artObj.likeCount += artObj.isLiked ? -1 : 1;
      artObj.isLiked = !artObj.isLiked;
      currArt = artObj.isLiked;
      setArtInfo(artObj);

      if (currArt) {
        await axios.put(`/art/likes/${artid}/${userid}`);
      } else {
        await axios.put(`/art/dislikes/${artid}/${userid}`);
      }
      await updateArts();
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <Modal
      isOpen={viewArt}
      onRequestClose={closeArt}
      style={customstyles}
      contentLabel="Viewing Art"
    >
      {
        <>
          <div className={styles.modalHeader}>
            <div className={styles.viewArt}>You can view art here</div>
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
                height="50"
                width="45"
              />
              <div className={styles.post_info}>
                <div data-react-className={styles.PopoverLink}>
                  <span className={styles.popover_link_modal} data-reactroot="">
                    <a href={`/profile/${artInfo?.artist?.id}`}>
                      {artInfo?.artist?.name}
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className={`${styles.post_stats} ${styles.clearfix}`}>
              <div className={styles.pull_right_modal}>
                <div className={styles.iconClass}>
                  <FontAwesomeIcon
                    className={artInfo.isLiked ? styles.liked : styles.unliked}
                    onClick={handleLikeClickForModal}
                    icon={faHeart}
                    size="2x"
                  ></FontAwesomeIcon>
                  <p className={styles.count}>{artInfo?.likeCount}</p>
                </div>
                <div className={styles.iconClass}>
                  <FontAwesomeIcon icon={faEye} size="2x" />
                  <p className={styles.count}>{artInfo?.data?.views}</p>
                </div>
              </div>

              <div className={styles.pull_left_modal}>
                <p>{getFormattedDate(artInfo?.data?.createdAt)}</p>
              </div>
            </div>
          </div>
          <div className={styles.singleArt}>
            <div className={styles.modalTitle}>
              <p>{artInfo?.data?.title}</p>
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
    </Modal>
  );
};

export default ArtView;