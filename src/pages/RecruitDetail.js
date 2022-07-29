// react
import React, { useEffect, useState } from "react";

// components
import PhotoSlide from "../components/PhotoSlide.js";

// elements
import Wrap from "../elements/Wrap";
import EditBubble from "../elements/EditBubble";

// style
import styled from "styled-components";

// router
import { useParams, useNavigate } from "react-router-dom";

// icon
import { IoMdMore } from "react-icons/io";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

// axios
import instance from "../shared/axios";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const RecruitDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(); //Api에서 받은 데이터 변수 설정
  const [bubbleOn, setBubbleOn] = React.useState(false);
  const [like, setLike] = useState();
  const [box, setBox] = useState(true);
  const [lastDay, setLastDay] = useState();

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
  };

  // // axios에서 데이터를 받아오기
  // useEffect(() => {
  //   instance.get('/api/together/detail/' + params.id).then((response) => {
  //     setData(response.data); //useState의 data에 넣어준다.

  //     // console.log(response.data.dday);

  //     setInterval(() => {
  //       const masTime = new Date(response.data.dday);
  //       const todayTime = new Date();
  //       const diff = masTime - todayTime;

  //       const diffHour = Math.floor(diff / (1000 * 60 * 60));
  //       const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  //       const diffSec = Math.floor((diff / 1000) % 60);

  //       if (diffHour < 10) {
  //         const Dday = `0${diffHour}:${diffMin}:${diffSec}`;
  //         setLastDay(Dday);
  //       } else if (diffMin < 10) {
  //         const Dday = `${diffHour}:0${diffMin}:${diffSec}`;
  //         setLastDay(Dday);
  //       } else if (diffSec < 10) {
  //         const Dday = `${diffHour}:${diffMin}:0${diffSec}`;
  //         setLastDay(Dday);
  //       } else {
  //         const Dday = `${diffHour}:${diffMin}:${diffSec}`;
  //         setLastDay(Dday);
  //       }
  //     }, 1000);
  //   });
  // }, [params.id, like]);

  useEffect(() => {
    instance.get("/api/together?page=0").then((response) => {
      console.log(response.data);
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

  const changeBox = () => {
    setBox(!box);
  };

  return (
    <Wrap>
      <Header>
        <HeadBtn>
          <Back
            onClick={() => {
              navigate("/together");
            }}
            src={require("../assets/images/back.png.png")}
          />
          <HeadTitle>
            <p>{data?.title}</p>
            <span>{data?.postCategory}</span>
          </HeadTitle>
          <JumMom>
            <IoMdMore id="optionMenu" onClick={menuOpen} style={{ marginLeft: "80%" }} />
            {bubbleOn ? <EditBubble data={data} page={"recruit"} setBubbleOn={setBubbleOn} /> : null}
          </JumMom>
        </HeadBtn>
      </Header>
      <All>
        <UserInfo>
          <User>
            <UserImg src={data?.userProfileImg} alt="" />
            <UserName>{data?.nickname}</UserName>
          </User>
        </UserInfo>
        {data?.img.length === 0 ? null : (
          <ImgBox>
            <PhotoSlide photos={data?.img} />
          </ImgBox>
        )}
        <Content>{data?.contents}</Content>
        <Reactions>
          <span>
            {like === true ? (
              <IoHeartOutline onClick={clickHeart} />
            ) : (
              <IoHeart style={{ color: "red" }} onClick={clickHeart} />
            )}
            <span>{data?.likeCnt}</span>{" "}
          </span>
        </Reactions>
      </All>
      {box === true ? (
        <ChatBox>
          <BtnBox>
            <ChatBtn onClick={changeBox}>
              <span>
                <FiChevronUp />
              </span>
            </ChatBtn>
          </BtnBox>

          <InfoAll>
            <Info>
              <InfoUser>
                <InfoUserImg src={data?.userProfileImg} alt="" />
                <p>{data?.nickname}</p>
              </InfoUser>
              <Location>
                <Gu>
                  <span>{data?.cityName}</span>
                </Gu>
                <Gu>
                  <span>{data?.provinceName}</span>
                </Gu>
              </Location>
            </Info>
          </InfoAll>
        </ChatBox>
      ) : (
        <JengBo>
          <ChatB onClick={changeBox}>
            <span>
              <FiChevronDown />
            </span>
          </ChatB>
          <JengBoUser>
            <div>
              <JengBoUserImg src={data?.userProfileImg} alt="" />
              <p>{data?.nickname}</p>
            </div>
          </JengBoUser>
          <JengBoLocation>
            <Dong>
              <span>{data?.cityName}</span>
            </Dong>
            <Gu>
              <span>{data?.provinceName}</span>
            </Gu>
          </JengBoLocation>
          <Chatting>
            <AddBtn onClick={() => navigate(`/chatting/${params.id}`)}>Comming soon</AddBtn>
          </Chatting>
          <Recruitment>
            <div>
              <p>모집 마감 {lastDay}</p>
            </div>
            <div>
              <img src={require("../assets/images/캡처.PNG")} />{" "}
              <p>
                {data?.peopleCnt}/{data?.limitPeople}
              </p>
            </div>
          </Recruitment>
        </JengBo>
      )}
    </Wrap>
  );
};

const Header = styled.div`
  display: flex;
  width: 83%;
  height: 70px;
  margin: 7% 5% 0 5%;
`;

const HeadBtn = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Back = styled.img`
  height: 30%;
  margin-left: 6%;
  margin-top: 1%;
`;

const HeadTitle = styled.div`
  text-align: center;
  width: 40%;
  margin-left: 29%;
  margin-top: 1%;

  /* margin-top: -50px; */

  p {
    margin: 1.5%;
    font-size: clamp(10px, 5.67vw, 20px);
    font-weight: bold;
  }

  span {
    font-size: clamp(8px, 2.67vw, 16px);
    opacity: 0.6;
  }
`;

const All = styled.div`
  margin: 0 10% 0 10%;
  height: 40vh;
  width: 80%;
`;

const UserInfo = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
`;

const User = styled.div`
  display: flex;
  width: 50%;
`;

const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  border: solid 1px black;
`;

const UserName = styled.span`
  font-size: clamp(8px, 3.67vw, 16px);
  width: 70%;
  margin: 4%;
`;

const JumMom = styled.div`
  position: relative;
  font-size: 25px;
  opacity: 0.6;
  z-index: 10;
  width: 50%;
`;

const ImgBox = styled.div`
  display: flex;
  overflow-x: auto;
  /* overflow-x: hidden; */
  scroll-snap-type: x mandatory;
  width: 100%;
  height: 22vh;
  margin-left: -1%;
  margin-top: 3%;
  border-radius: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.p`
  width: 90%;
  margin-left: 4%;
  margin-top: 2%;
  margin-bottom: 2%;
  line-height: 1.8;
  font-size: clamp(8px, 3.6vw, 20px);
`;

const Reactions = styled.div`
  padding-top: 15px;
  font-size: clamp(8px, 3.2vw, 15px);
  span {
    margin-right: 10px;
  }
`;

const ChatBox = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 11vh;
  bottom: 90px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
`;

const BtnBox = styled.div`
  height: 40px;
`;

const ChatBtn = styled.button`
  height: 100%;
  right: 12%;
  width: 48px;
  font-size: 30px;
  font-weight: 300;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  background-color: #44dcd3;
  color: black;
  margin-left: 76%;
  padding-top: 5px;
`;

const InfoAll = styled.div`
  box-shadow: 0 -5px 10px -4px gray;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  height: 40px;
  width: 100%;
  padding: 0 10% 0 10%;
  display: block;
`;

const Info = styled.div`
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  height: 4.3vh;
  width: 100%;
  padding: 3% 0 0 0;
  display: flex;
`;

const InfoUserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  border: solid 1px black;
`;

const InfoUser = styled.div`
  width: 60%;
  display: flex;

  p {
    font-size: clamp(8px, 3.67vw, 16px);
    width: 70%;
    margin: 3.2% 0 0 5%;
  }
`;

const Location = styled.div`
  width: 40%;
  display: flex;
`;

const Gu = styled.div`
  width: 45%;
  height: 35px;
  border: 1px solid gray;
  margin: 0 2% 0 2%;
  text-align: center;
  line-height: 33px;
  border-radius: 30px;

  span {
    opacity: 0.7;
    font-size: 13px;
  }
`;
const Dong = styled.div`
  width: 45%;
  height: 35px;
  border: 1px solid gray;
  margin: 0 2% 0 2%;
  text-align: center;
  line-height: 33px;
  border-radius: 30px;

  span {
    opacity: 0.7;
    font-size: 13px;
  }
`;

const JengBo = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: 26vh;
  bottom: 90px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  border-radius: 30px;
  box-shadow: 0 -5px 10px -4px gray;
`;

const ChatB = styled.button`
  position: fixed;
  height: 45px;
  width: 48px;
  font-size: 30px;
  font-weight: 300;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  background-color: #44dcd3;
  color: black;
  margin-left: 76%;
  padding-top: 10px;
`;

const JengBoUser = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  margin: 35px 0 0 0;

  div {
    margin: auto;

    width: 42%;
    display: flex;
  }

  p {
    font-size: clamp(8px, 4.67vw, 16px);
    width: 50%;
    margin: auto;
    margin-left: 1%;
  }
`;

const JengBoUserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  margin: auto;
`;

const JengBoLocation = styled.div`
  width: 40%;
  display: flex;
  margin: auto;
`;

const Chatting = styled.div`
  width: 50%;
  height: 21%;
  margin: 10px 25% 0 25%;
`;

const AddBtn = styled.button`
  width: 100%;
  height: 100%;
  flex-grow: 0;
  font-weight: bold;
  border-radius: 10px;
  background-color: #d3d3d3;
`;

const Recruitment = styled.div`
  display: flex;
  width: 50%;

  justify-content: space-between;
  margin: auto;
  margin-top: 2%;

  div {
    display: flex;
  }

  p {
    font-size: 16px;
    margin-top: 1px;
    opacity: 0.6;
  }

  img {
    height: 18px;
    margin-top: 1px;
  }

  span {
    font-size: 16px;
    margin-top: -2px;
    opacity: 0.6;
  }
`;

export default RecruitDetail;
