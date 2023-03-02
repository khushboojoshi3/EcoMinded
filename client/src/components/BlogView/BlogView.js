import React, { Component, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEye,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {months} from "../../utils/date";
import Header from "../Header/Header";
import axios from "axios";
import { useState } from "react";
import styles from "./BlogView.module.css";
import { AuthContext } from "../../context/AuthContext";
const BlogView = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const {
    data: blog,
    isLoading,
    error,
    refetch,
  } = useQuery("blog_view", () => {
    return axios.get(`/blog/find/${id}`);
  });

  console.log(blog);
  // const bd = ;
  // console.log(bd);
  const [blogData, setBlogData] = useState({
    ...blog,
    likeCount: blog?.data?.data?.likes?.length,
    isLiked: blog?.data?.data?.likes.includes(user?._id),
  });
  

  useEffect(() => {
    setBlogData({
      ...blog,
      likeCount: blog?.data?.data?.likes?.length,
      isLiked: blog?.data?.data?.likes.includes(user?._id),
    });
  }, [blog]);
 
  const handleLikeClick = async () => {
    
    try {
      let currBlog = false;
      const blogid = blogData?.data?.data?._id;
      const blogObj = blogData;
      console.log(blogObj);
      blogObj.likeCount += blogObj.isLiked ? -1 : 1;
      blogObj.isLiked = !blogObj.isLiked;
      currBlog = blogObj.isLiked;
      setBlogData(blogObj);
      
      if (currBlog) {
        await axios.put(`/blog/likes/${blogid}/${user._id}`);
      } else {
        await axios.put(`/blog/dislikes/${blogid}/${user._id}`);
      }
      await refetch();
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(blogData);

  const getBlogDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth(); // getMonth() returns month from 0 to 11
    const year = date.getFullYear();
    const str = `${day}-${months[month]}-${year}`;
    return str;
  };
  //   console.log(blog);
  return (
    <>
      <Header />
      <div className={styles.blog_post}>
        {isLoading ? (
          "Loading"
        ) : (
          <>
            <div className={styles.blog_hero}></div>
            <article>
              <div className={styles.post_metadata}>
                <img
                  alt=""
                  className={styles.avatar_image}
                  src={blogData?.data?.author?.photo}
                  height="40"
                  width="40"
                />
                <div className={styles.post_info}>
                  <div data-react-className={styles.PopoverLink}>
                    <span className={styles.popover_link} data-reactroot="">
                      <a href={`/profile/${blogData?.data?.author?.id}`}>
                        {blogData?.data?.author?.name}
                      </a>
                    </span>
                  </div>
                  <small>{getBlogDate(blogData?.data?.data?.createdAt)}</small>
                </div>
                <div className={styles.pull_right}>
                  <div className={styles.iconClass}>
                    <FontAwesomeIcon
                      onClick={(e) => {
                        e.preventDefault();
                        handleLikeClick();
                      }}
                      className={
                        blogData?.isLiked ? styles.liked : styles.unliked
                      }
                      icon={faHeart}
                    ></FontAwesomeIcon>
                    <div className={styles.count}>{blogData?.likeCount}</div>
                  </div>
                  <div className={styles.iconClass}>
                    <FontAwesomeIcon icon={faEye} />
                    <div className={styles.count}>
                      {blogData?.data?.data?.views}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.blog_content}>
                <summary>
                  <h3>{blogData?.data?.data?.title}</h3>
                </summary>
                <div className={styles.blog_img}>
                  <img src={blogData?.data?.data?.feature_img}></img>
                </div>
                <p className={styles.contentClass}>
                  {blogData?.data?.data?.content}
                </p>
              </div>
            </article>
          </>
        )}
      </div>
    </>
  );
};

export default BlogView;
