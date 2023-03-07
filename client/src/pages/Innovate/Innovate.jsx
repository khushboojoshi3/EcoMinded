import * as React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import Feed  from "../../components/Feed/Feed";
import Art from "../../components/Art/Art";
import { useQuery } from "react-query";
import Header from "../../components/Header/Header";
import axios from "axios";
import styles from "./Innovate.module.css";

// const labelStyles = {
//   root: { marginTop: 5, backgroundColor: "white" },
// };

const Innovate = () => {
  const {
    data: arts,
    isLoading: isLoadingArt,
    error: errArt,
    refetch: refetchArt,
  } = useQuery(
    "innovate_art",
    () => {
      return axios.get("/art");
    },
    { refetchInterval: 120000 }
  );
  const {
    data: blogs,
    isLoading: isLoadingBlog,
    error: errBlog,
    refetch: refetchBlog,
  } = useQuery(
    "innovate_blog",
    () => {
      return axios.get("/blog");
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
      <Header/>
      <div className={styles.pivot}>
        <Pivot aria-label="Innovate">
          <PivotItem headerText="Art">
            {errArt ? (
              "An error occured"
            ) : isLoadingArt ? (
              "Loading"
            ) : (
                <Art updateArts={fetchUpdatedArts} arts={arts.data} />
            )}
          </PivotItem>
          <PivotItem headerText="Blog">
            {errBlog ? (
              "An error occured"
            ) : isLoadingBlog ? (
              "Loading"
            ) : (
                <Feed updateBlogs={fetchUpdatedBlogs} blogs={blogs.data} />
            )}
          </PivotItem>
        </Pivot>
      </div>
    </>
  );
};

export default Innovate;
