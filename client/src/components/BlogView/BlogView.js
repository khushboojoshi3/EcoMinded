import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEye,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Header from "../Header/Header";
import axios from "axios";
import styles from "./BlogView.module.css";
const BlogView = () => {
  const { id } = useParams();
  const {
    data: blog,
    isLoading,
    error,
    refetch,
  } = useQuery("blog_view", () => {
    return axios.get(`/blog/find/${id}`);
  });

  const getBlogDate = (createdAt) => {
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
                src={blog.data.author.photo}
                height="40"
                width="40"
              />
              <div className={styles.post_info}>
                <div data-react-className={styles.PopoverLink}>
                  <span className={styles.popover_link} data-reactroot="">
                    <a href={`/profile/${blog.data.author.id}`}>
                      {blog.data.author.name}
                    </a>
                  </span>
                </div>
                <small>{getBlogDate(blog.data.data.createdAt)}</small>
              </div>
              <div className={styles.pull_right}>
                <div className={styles.iconClass}>
                  <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                  <div className={styles.count}>{blog.data.data.likes}</div>
                </div>
                <div className={styles.iconClass}>
                  <FontAwesomeIcon icon={faEye} />
                  <div className={styles.count}>{blog.data.data.views}</div>
                </div>
              </div>
            </div>
            <div className={styles.blog_content}>
              <summary>
                <h3>{blog.data.data.title}</h3>
              </summary>
              <div className={styles.blog_img}>
                <img src={blog.data.data.feature_img}></img>
              </div>
              <p className={styles.contentClass}>{blog.data.data.content}</p>
            </div>
          </article>
        </>
      )}
    </div>
    </>
  );
};

export default BlogView;
