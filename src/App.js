// react
import React, { useEffect } from "react";

// route
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  FindId,
  FindPassword,
  Home,
  Login,
  Oauth,
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
  Reels,
  ReelsWrite,
  CommunityList,
  CommunityDetail,
  CommunityWrite,
  CommunityUpdate,
  RecruitDetail,
  RecruitUpdate,
  RecruitWrite,
  ChattingRoom,
} from "./pages/Index.js";

// style
import GlobalStyles from "./styles/GlobalStyles";
import { defaultTheme } from "./styles/theme";
import { ThemeProvider } from "styled-components";

// store
import { setAccessToken } from "./shared/axios";
import { getCookie } from "./shared/cookie";

// redux
import { useDispatch } from "react-redux";

// userSlice
import { setUserDB } from "./redux/modules/userSlice";

//component
import NavMenu from "./components/NavMenu";
import ScrollRestore from "./elements/ScrollRestore";

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
        <ScrollRestore />
        <NavMenu />
        <Routes>
          <Route path="/oauth" element={<Oauth />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage/:nickname" element={<Mypage />} />
          <Route path="/myedit" element={<UserEdit />} />
          <Route path="/user/findId" element={<FindId />} />
          <Route path="/user/findPassword" element={<FindPassword />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/write" element={<PostWrite />} />
          <Route path="/post/update/:id" element={<PostUpdate />} />
          <Route path="/post/detail/:id" element={<PostDetail />} />
          <Route path="/community/write" element={<CommunityWrite />} />
          <Route path="/community/update/:id" element={<CommunityUpdate />} />
          <Route path="/community/detail/:id" element={<CommunityDetail />} />
          <Route path="/together" element={<CommunityList type="together" />} />
          <Route path="/community" element={<CommunityList type="community" />} />
          <Route path="/chatting/:roomId" element={<ChattingRoom type="community" />} />
          <Route path="/recruit/write" element={<RecruitWrite />} />
          <Route path="/recruit/update/:id" element={<RecruitUpdate />} />
          <Route path="/recruit/detail/:id" element={<RecruitDetail />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/detail/:id" element={<NoticeDetail />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/reels/write/:id" element={<ReelsWrite />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
