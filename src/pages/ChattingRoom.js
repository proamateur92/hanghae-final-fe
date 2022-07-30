// react
import { useEffect, useRef, useState } from "react";

// web socket
import Stomp from "stompjs";
import SockJS from "sockjs-client";

// cookie
import { getCookie } from "../shared/cookie";

// redux
import { useSelector } from "react-redux";
import styled from "styled-components";

import { useParams } from "react-router-dom";

const ChattingRoom = () => {
  const [chatData, setChatData] = useState([]);
  // const [message, setMessage] = useState('');
  const message = useRef();

  const sock = new SockJS("http://43.200.52.184:8090/ws-stomp");
  const ws = Stomp.over(sock);

  const token = getCookie("accessToken");
  const { roomId } = useParams();
  const userInfo = useSelector((state) => state.user.info);
  const sender = userInfo.nickname;

  useEffect(() => {
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [roomId]);

  const addMessage = (message) => {
    console.log(message);
    setChatData({ ...message, message });
  };

  console.log(`chatData: ${chatData}`);
  // 웹소켓 연결, 구독
  function wsConnectSubscribe() {
    try {
      ws.connect({}, () => {
        ws.subscribe("/chat/message/rooms/", (data) => {
          const newMessage = JSON.parse(data.body);
          addMessage(newMessage);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 연결해제, 구독해제
  const wsDisConnectUnsubscribe = () => {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
        },
        { token }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (ws, callback) => {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  };

  // 메시지 보내기
  const sendMessage = (event) => {
    event.preventDefault();
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        window.location.replace("/");
      }
      // send할 데이터
      const data = {
        type: "TALK",
        roomId,
        sender: sender,
        message: message.current.value,
      };
      // 빈문자열이면 리턴
      if (message === "") {
        return;
      }

      ws.send("/chat/message", { token: token }, JSON.stringify(data));

      // 로딩 중
      // waitForConnection(ws, function () {
      //   ws.send("/chat/message", { token }, JSON.stringify(data));
      //   console.log("메시지 보내기");
      //   console.log("data: ", data);
      //   console.log(ws.ws.readyState);
      // dispatch(postChatAction(''));
      //   });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  };

  return (
    <div>
      <ChattingBox>
        {chatData.map((chat) => (
          <div>{chat}</div>
        ))}
      </ChattingBox>
      <form onSubmit={() => sendMessage()} style={{ backgroundColor: "grey", padding: "10px" }}>
        <input ref={message} type="text" placeholder="메시지 입력"></input>
        <button onClick={sendMessage}>메시지 보내기</button>
      </form>
    </div>
  );
};

const ChattingBox = styled.div`
  width: 90%;
  height: 20vh;
  background-color: #bcbcbc;
`;
export default ChattingRoom;
