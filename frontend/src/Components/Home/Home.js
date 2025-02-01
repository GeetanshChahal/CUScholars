import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/Post/PostAction";
import { getUserfromLocalStorage } from "../../Utils/Utils";
import Posts from "./Posts";
import "./Home.css";
import Suggestion from "./Suggestion";

export default function Home() {
  const dispatch = useDispatch();

  const postState = useSelector((state) => state.post);
  const { posts, isError, isPostSuccess, message } = postState;
  //console.log(postState);

  const currentUser = getUserfromLocalStorage;

  useEffect(() => {
    async function fetchData() {
      await dispatch(getPosts());
    }
    fetchData();
  }, []);

  return (
    <section className="main-container">
      <div className="inner-container">
        <div className="left-section">
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <Posts key={index} post={post} currentUser={currentUser} />
            ))
          ) : (
            <h2>Add Posts/Follow friends to have Fun</h2>
          )}
        </div>
        <div className="right-section" style={{ marginLeft: "100px" }}>
          <Suggestion />
        </div>
      </div>
    </section>
  );
}
