import React, { useCallback } from "react";

// element
import Wrap from "../elements/Wrap";

// components
import PostCard from "../components/PostCard";
import SubHeader from "../elements/SubHeader";

// redux
import { useSelector, useDispatch } from "react-redux";
import { loadPostsDB } from "../redux/modules/postSlice";

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.list);
  const isLastPg = useSelector((state) => state.post.last);
  const postEndRef = React.useRef();
  const [page, setPage] = React.useState(-1);

  const loadinghandler = useCallback((entries) => {
    if (entries[0].isIntersecting && !isLastPg) {
      setPage((page) => page + 1);
    }
  }, [isLastPg]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(loadinghandler, { threshold: 0.5 });
    if (postEndRef.current) {
      observer.observe(postEndRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [loadinghandler]);


  React.useEffect(() => {
    if ( page >= 0 && !isLastPg) {
      dispatch(loadPostsDB(page));
      console.log("새 페이지 로딩");
    } else {
      console.log("마지막 페이지");
    }
  }, [page, dispatch, isLastPg]);

  return (
    <Wrap>
      <SubHeader title={'자랑하기'}> </SubHeader>
      {posts.map((post) => (
        <PostCard key={post.boardMainId} data={post} />
      ))}

      <div ref={postEndRef}/>
    </Wrap>
  );
};

export default Post;
