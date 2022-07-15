import React from "react";

// style
import styled from "styled-components";

// element
import { BsPlusLg } from "react-icons/bs";

//component
import NavCircle from "./NavCircle";

//route
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
  const navigate = useNavigate()
  const [circleOn, setCircleOn] = React.useState(false);

  return (
      <NavWrap>
        <div onClick={()=> navigate('/post')}> 자랑하기 </div>
        <button onClick={()=> setCircleOn(true)}> <BsPlusLg/> </button>
        { circleOn ? <NavCircle setCircleOn={setCircleOn}/> : null }
        <div onClick={()=> navigate('/')}> 릴스 </div>
      </NavWrap>
  );
};

export default NavMenu;

const NavWrap = styled.div`
  position: fixed;  
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  height: 12.2vh;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;

  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 37%;
    height: 8.5vh;
    background: #ededed;
    cursor: pointer;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8.5vh;
    height: 8.5vh;
    min-height: 61px;
    border-radius: 600px;
  }
`;
