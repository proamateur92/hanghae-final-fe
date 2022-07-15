import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { removeDataDB } from "../redux/modules/postSlice";

// components
import Comment from "../components/Comment";

// elements
import Wrap from "../elements/Wrap";
import EditBubble from "../elements/EditBubble";

// style
import styled from "styled-components";

// router
import { useParams, useNavigate } from "react-router-dom";

// icon
import { IoMdMore } from "react-icons/io";
import { IoHeartOutline, IoChatbubbleOutline, IoHeart } from "react-icons/io5";

// axios
import instance from "../shared/axios";

const PostDetail = () => {
  const params = useParams();
  const [data, setData] = useState(); //Api에서 받은 데이터 변수 설정
  const navigate = useNavigate();
  const [bubbleOn, setBubbleOn] = React.useState(false);
  const [like, setLike] = useState();

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
  };

  // axios에서 데이터를 받아오기
  useEffect(() => {
    instance.get("/api/post/" + params.id).then((response) => {
      setData(response.data); //useState의 data에 넣어준다.
      // console.log(response.data)
    });
  }, [params.id, like]);

  useEffect(() => {
    instance.get("/api/post/category/all?page=0").then((response) => {
      // console.log(response.data)
    });
  }, []);

  const clickHeart = () => {
    instance.post("/api/heart/" + params.id).then((res) => {
      console.log(res);
      setLike(!like);
    });
  };

  useEffect(() => {
    instance.get("/api/heart/" + params.id).then((res) => {
      // console.log(res)
      setLike(res.data);
    });
  }, [params.id]);

  return (
    <Wrap>
      <div>
        <Back
          onClick={() => {
            navigate("/post");
          }}
          src={require("../assets/images/back.png.png")}
          alt=""
        />
      </div>
      <All>
        <UserInfo>
          <User>
            <UserImg src={data?.userProfileImg} alt="" />
            <UserName>{data?.nickname}</UserName>
          </User>
          <Jum>
            <JumMom>
              <IoMdMore id="optionMenu" onClick={menuOpen} />
              {bubbleOn ? (
                <EditBubble
                  contentsId={data?.postId}
                  setBubbleOn={setBubbleOn}
                />
              ) : null}
            </JumMom>
          </Jum>
        </UserInfo>
        <ImgBox>
          {data?.img.map((v, i) => {
            return (
              <ImgCard key={v.id}>
                <MainImg src={v.url} />
              </ImgCard>
            );
          })}
        </ImgBox>
        <Content>{data?.contents}</Content>
        <Reactions>
          <span>
            {like === true ? (
              <IoHeartOutline onClick={clickHeart} />
            ) : (
              <IoHeart onClick={clickHeart} />
            )}
            <span>{data?.likeCnt}</span>{" "}
          </span>
          <span>
            <IoChatbubbleOutline /> {data?.viewCnt}{" "}
          </span>
        </Reactions>
      </All>

      <Comment postId={params.id} />
    </Wrap>
  );
};

const Back = styled.img`
  height: 30px;
  padding: 20px;
`;

const All = styled.div`
  padding: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const User = styled.div`
  display: flex;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  border: solid 1px black;
`;

const UserName = styled.span`
  font-size: 30px;
  margin-top: 10px;
  margin: 10px;
`;

const Jum = styled.div``;

const JumMom = styled.div`
  position: relative;
  font-size: 30px;
  margin-top: 10px;
`;

const ImgBox = styled.div`
  display: flex;
  overflow: auto;
  scroll-snap-type: x mandatory;
  width: 80%;
  height: 60%;
  margin: 0 10%;
`;

const ImgCard = styled.div`
  flex: none;
  scroll-snap-align: start;
  width: 100%;
  height: 98%;
`;

const MainImg = styled.img`
  padding: 10px;
  width: 90%;
  display: block;
  height: 90%;
`;

const Content = styled.p`
  padding: 20px;
  margin-left: 10px;
`;

const Reactions = styled.div`
  padding-top: 15px;
  border-top: 1px solid #eee;

  span {
    margin-right: 10px;
  }
`;

export default PostDetail;
