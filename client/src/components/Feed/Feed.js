import React, { Component, useContext, useEffect } from "react";
import styles from "./Feed.module.css";
import {
  faHeart,
  faEye,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { useState } from "react";
import {months} from "../../utils/date";
import axios from "axios";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { VscSmiley } from "react-icons/vsc";
import { AuthContext } from "../../context/AuthContext";
Modal.setAppElement("#root");

export function Feed({ blogs, updateBlogs }) {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const [blogData, setBlogData] = useState(
    blogs.map((blog) => {
      return {
        ...blog,
        likeCount: blog.data.likes.length,
        isLiked: blog.data.likes.includes(user?._id),
      };
    })
  );

  useEffect(() => {
    setBlogData(
      blogs.map((blog) => {
        return {
          ...blog,
          likeCount: blog.data.likes.length,
          isLiked: blog.data.likes.includes(user?._id),
        };
      })
    );
  }, [blogs]);
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
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const customstyless = {
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
  const handleReadMoreClick =async (blogid) => {
    try{
      await axios.put(`/blog/views/${blogid}`);
      navigate(`/blogview/${blogid}`);
    }catch(err){
      console.log(err.response.data);
    }
  }
  const handleLikeClick = async (blogid) => {
    try {
      let currBlog = false;
      setBlogData(
        blogData.map((blog) => {
          if (blog.data._id === blogid) {
            blog.likeCount += blog.isLiked ? -1 : 1;
            blog.isLiked = !blog.isLiked;
            currBlog = blog.isLiked;
          }
          return blog;
        })
      );
      if (currBlog) {
        await axios.put(`/blog/likes/${blogid}/${user._id}`);
      } else {
        await axios.put(`/blog/dislikes/${blogid}/${user._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (id) => {
    try {
      const newBlog = await axios.post(
        `/blog/${user._id}`,
        {
          title: title,
          content: content,
          feature_img: url,
          author: user._id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      await updateBlogs();
      closeModal();
      setIsSubmitDisabled(false);
      console.log(newBlog);
      navigate(`/blogview/${newBlog.data._id}`);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const getBlogDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth(); // getMonth() returns month from 0 to 11
    const year = date.getFullYear();
    const str = `${day}-${months[month]}-${year}`;
    return str;
  };
  const articles = blogData.map((blog) => {
    return (
      <div
        key={blog.data._id}
        style={{ backgroundColor: "#FFFFFF" }}
        className={styles.post_panel}
      >
        <div className={styles.post_metadata}>
          <img
            alt=""
            className={styles.avatar_image}
            src={blog.author.photo}
            height="40"
            width="40"
          />
          <div className={styles.post_info}>
            <div data-react-className={styles.PopoverLink}>
              <span className={styles.popover_link} data-reactroot="">
                <a href={`/profile/${blog.author.id}`}>{blog.author.name}</a>
              </span>
            </div>
            <small>Posted • A must read</small>
          </div>
        </div>
        <div className={styles.image_content}>
          <div className={styles.main_body}>
            <div className={styles.post_body}>
              <p dangerouslySetInnerHTML={{ __html: blog.data.title }}></p>
            </div>
            <div className={styles.post_demo}>
              {blog.data.content.substring(0, 200)} ...
              <a
                className={styles.read_more}
                href="javascript:void(0)"
                onClick={() => handleReadMoreClick(blog.data._id)}
                // href={`/blogview/${blog.data._id}`}
              >
                Read more
              </a>
            </div>
          </div>

          {blog.data.feature_img.length > 0 ? (
            <div className={styles.post_picture_wrapper}>
              <img
                width="300"
                height="200"
                src={blog.data.feature_img}
                alt="Thumb"
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={`${styles.post_stats} ${styles.clearfix}`}>
          <div className={styles.pull_left}>
            <div className={styles.iconClass}>
              <FontAwesomeIcon
                onClick={(e) => {
                  e.preventDefault();
                  handleLikeClick(blog.data._id);
                }}
                icon={faHeart}
                className={blog.isLiked ? styles.liked : styles.unliked}
                size="2x"
              ></FontAwesomeIcon>
              <p className={styles.count}>{blog.likeCount}</p>
            </div>
            <div className={styles.iconClass}>
              <FontAwesomeIcon icon={faEye} size="2x" />
              <p className={styles.count}>{blog.data.views}</p>
            </div>
          </div>

          <div className={styles.pull_right}>
            <p>{getBlogDate(blog.data.createdAt)}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={styles.blogBackground}>
        <div>
          <button className={styles.button_9}>
            <span onClick={openModal}>+ New Blog</span>
          </button>
        </div>

        <div className={`${styles.container_fluid} ${styles.main_container}`}>
          <div
            className={`${styles.col_md_6} ${styles.col_md_offset_1} ${styles.dashboard_main_content}`}
          >
            <div
              className={`${styles.posts_wrapper} ${styles.animated} ${styles.fadeInUp}`}
              data-behavior="endless-scroll"
              data-animation="fadeInUp-fadeOutDown"
            >
              {articles}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customstyless}
        contentLabel="New Blog"
      >
        <div className={styles.modalHeader}>
          <div>Add a New Blog</div>
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
          <label for="content">Add Blog Content</label>
          <textarea
            id="content"
            name="content"
            rows="4"
            cols="40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          >
            hello
          </textarea>
          <VscSmiley />
          <div>
            <input
              type="file"
              placeholder="Choose image"
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
          <div>
            Uploaded image will be displayed here
            <img width="200" height="120" src={url} />
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
    </>
  );
}
