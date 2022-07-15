import React from "react";

// element
import Portal from "../elements/Portal";

// style
import styled from "styled-components";
import { BsPlusLg, BsChatLeft, BsPerson, BsStar, BsFilm } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";

// route
import { useNavigate, useLocation } from "react-router-dom";

const NavCircle = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setCircleOn = props.setCircleOn;
  const backDropRef = React.useRef();

  const [plusOpen, setPlusOpen] = React.useState(false)

  console.log(location.pathname)

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const moveTo = (url) => {
    navigate(url)
    document.body.style.overflow = "unset";
    setCircleOn(false); 
  }

  const closePlus = (e) => {
    if (e.target === backDropRef.current) {
      document.body.style.overflow = "unset";
      setCircleOn(false);
    }
  };

  return (
    <Portal>
      <BackDrop ref={backDropRef} onClick={(e) => closePlus(e)}>

      {
        plusOpen ?
        <WriteMenu>
          <div onClick={() => moveTo('/post/write')}> 자랑글 작성 </div>
          <div onClick={() => moveTo('/')}> 산책글 작성 </div>
          <div onClick={() => moveTo('/')}> 산책모집 작성 </div>
          <div onClick={() => moveTo('/')}> 릴스 작성 </div>
        </WriteMenu> 
        : null
      }

        <MenuCircle>
          <Center onClick={()=> setPlusOpen(!plusOpen)}>
            <BsPlusLg />
          </Center>

          <Menu order={0} onClick={() => moveTo('/')}>
            <BsChatLeft className={"icons"} />
            <span> 채팅 </span>
          </Menu>

          <Menu order={1} onClick={() => moveTo('/mypage')}>
            <BsPerson className={"icons"} />
            <span> 마이페이지 </span>
          </Menu>

          <Menu order={2} onClick={() => moveTo('/')}>
            <BiHomeAlt className={"icons"} />
            <span> 홈 </span>
          </Menu>

          <Menu order={3} onClick={() => moveTo('/post')}>
            <BsStar className={"icons"} />
            <span> 자랑하기 </span>
          </Menu>

          <Menu order={4} onClick={() => moveTo('/')}>
            <BsFilm className={"icons"} />
            <span> 릴스 </span>
          </Menu>
        </MenuCircle>
      </BackDrop>
    </Portal>
  );
};

export default NavCircle;

const BackDrop = styled.div`
  position: fixed;
  z-index: 200;
  height: 100%;
  width: 100%;
  max-width: 600px;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.8);
`;

const WriteMenu =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6vh;
  width:47.5%;
  margin-bottom: 2.5vh;

  div {
    box-sizing: border-box;
    height: 11vh;
    max-height: 80px;
    width: 100%;
    border-radius: 11vh;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`

const MenuCircle = styled.div`
  width: 60%;
  min-width: 180px;
  height: 60vw;
  min-height: 180px;
  max-height: ${600 * 0.6}px;
  border-radius: 600px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -5%;
  position: relative;
`;

const Center = styled.div`
  margin: auto;
  width: 32.4%;
  height: 32.4%;
  min-height: 61px;
  border-radius: 600px;

  background: #44dcd3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: #fff;
`;

const Menu = styled.div`
  position: absolute;
  bottom: 40%;
  height: 20%;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #b2b2b2;
  cursor: pointer;

  transform: rotate(${(props) => (360 / 5) * props.order + "deg"}) translate(0, -170%)
    rotate(${(props) => -(360 / 5) * props.order + "deg"});

  .icons {
    /* stroke: #b2b2b2;
    stroke-width: 1px; */
    font-size: 22px;
  }
`;
