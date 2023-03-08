import * as React from "react";
import { Label, Pivot, PivotItem } from "@fluentui/react";
import Feed from "../../components/Feed/Feed";
import Art from "../../components/Art/Art";
import { useQuery } from "react-query";
import Header from "../../components/Header/Header";
import axios from "axios";
const labelStyles = {
  root: { marginTop: 5, backgroundColor: "white" },
};

const Innovate = (props) => {
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
  const pivotStyles = {
    root: {
      marginLeft:"20px"
    },
     text: {
       fontSize: "1.2rem",
     },
   };
  return (
    <>
      <Header/>
        <Pivot aria-label="Innovate" styles={pivotStyles}>
          <PivotItem headerText="Art">
            {errArt ? (
             console.log(errArt.response.data)
             
            ) : isLoadingArt ? (
              "Loading"
            ) : (
              <Label styles={labelStyles}>
                <Art updateArts={fetchUpdatedArts} arts={arts.data} />
              </Label>
            )}
          </PivotItem>
          <PivotItem headerText="Blog">
            {errBlog ? (
              "An error occured"
            ) : isLoadingBlog ? (
              "Loading"
            ) : (
              <Label styles={labelStyles}>
                <Feed updateBlogs={fetchUpdatedBlogs} blogs={blogs.data} />
              </Label>
            )}
          </PivotItem>
        </Pivot>
    </>
  );
};

export default Innovate;