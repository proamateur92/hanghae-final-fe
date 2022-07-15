// react
import React, { useEffect } from "react";

// route
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  FindPwd,
  Home,
  Login,
  Mypage,
  UserEdit,
  NotFound,
  Notice,
  NoticeDetail,
  Post,
  PostDetail,
  PostWrite,
  PostUpdate,
  Signup,
  CommunityDetail,
  CommunityUpdate,
  CommunityWrite,
  RecruitDetail,
  RecruitUpdate,
  RecruitWrite,
} from "./pages/Index";

// style
import GlobalStyles from "./styles/GlobalStyles";
import { defaultTheme } from "./styles/theme";
import { ThemeProvider } from "styled-components";

// axios
import axios from "axios";

// redux
import { useDispatch, useSelector } from "react-redux";
import { loadUserDB } from "./redux/modules/userSlice";
import { loadPostDB } from "./redux/modules/postSlice";
import { loadCommentDB } from "./redux/modules/commentSlice";
import { loadHeartDB } from "./redux/modules/heartSlice";
// store
import { setAccessToken } from "./shared/axios";
import { getCookie } from "./shared/cookie";

// userSlice
import { setUserDB } from "./redux/modules/userSlice";

//component
import NavMenu from "./components/NavMenu";

// Test
import Comment from "./components/Comment";

function App() {
  const theme = defaultTheme;
  setAccessToken();

  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(setUserDB());
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/myedit" element={<UserEdit />} />
          <Route path="/findinfo" element={<FindPwd />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/write" element={<PostWrite />} />
          <Route path="/post/update/:id" element={<PostUpdate />} />
          <Route path="/post/detail/:id" element={<PostDetail />} />
          <Route path="/community/write" element={<CommunityWrite />} />
          <Route path="/community/update/:id" element={<CommunityUpdate />} />
          <Route path="/community/detail/:id" element={<CommunityDetail />} />
          <Route path="/recruit/write" element={<RecruitWrite />} />
          <Route path="/recruit/update/:id" element={<RecruitUpdate />} />
          <Route path="/recruit/detail/:id" element={<RecruitDetail />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/detail/:id" element={<NoticeDetail />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/Comment" element={<Comment />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
