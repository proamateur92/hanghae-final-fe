// react
import React from 'react';

// router
import { useNavigate } from 'react-router-dom';

// componnet
import EditBubble from '../elements/EditBubble';

// style
import styled from 'styled-components';

// icon
import { IoMdMore } from 'react-icons/io';
import { IoHeartOutline, IoChatbubbleOutline } from 'react-icons/io5';

const PostCard = (props) => {
  const navigate = useNavigate();
  const postData = props.data;
  const boardMainId = props.data.boardMainId;

  const [bubbleOn, setBubbleOn] = React.useState(false);

  const menuOpen = () => {
    setBubbleOn(!bubbleOn);
  };

  return (
    <CardWrap>
      <CardHeader>
        <UserInfo>
          <UserProfile img={postData.userProfileImg} />
          <span id='nickname'> {postData.nickname} </span>
        </UserInfo>

        <IoMdMore id='optionMenu' onClick={menuOpen} />
        {bubbleOn ? <EditBubble contentsId={boardMainId} setBubbleOn={setBubbleOn} /> : null}
      </CardHeader>

      <Contents onClick={() => navigate('/post/detail/' + boardMainId)}>
        <ImgPreview
          img={
            'https://anyzoo-photo-bucket.s3.ap-northeast-2.amazonaws.com/user/45deb63e-1432-4a41-8637-74314093895a%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png'
          }
        />
        <TextPreview> {postData.contents} </TextPreview>
      </Contents>

      <Reactions>
        <span>
          <IoHeartOutline /> {postData.likeCnt}
        </span>

        <span>
          <IoChatbubbleOutline /> {postData.likeCnt}
        </span>
      </Reactions>
    </CardWrap>
  );
};

export default PostCard;

const CardWrap = styled.div`
  box-sizing: border-box;
  width: 90%;
  margin: auto;
  padding: 15px 10%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  position: relative;

  #optionMenu {
    cursor: pointer;
  }
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;

const UserProfile = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-right: 12px;
  background: url(${(props) =>
    props.img
      ? props.img
      : 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FopbGC%2FbtrF9ZNhpja%2FY026LUE8lwKcGmfqJiO3SK%2Fimg.png'});
  background-size: cover;
  background-position: center;
`;

const Contents = styled.div`
  cursor: pointer;
`;

const ImgPreview = styled.div`
  width: 100%;
  height: 310px;
  background: url(${(props) =>
    props.img
      ? props.img
      : 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FopbGC%2FbtrF9ZNhpja%2FY026LUE8lwKcGmfqJiO3SK%2Fimg.png'});
  background-size: cover;
  background-position: center;
  margin: auto;
`;

const TextPreview = styled.p`
  margin: 15px 0px;
  height: 15px;
  overflow: hidden;
`;

const Reactions = styled.div`
  padding-top: 15px;
  border-top: 1px solid #eee;

  span {
    margin-right: 10px;
  }
`;
