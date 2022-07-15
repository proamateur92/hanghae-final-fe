// react
import { useEffect } from 'react';

// element
import Wrap from '../elements/Wrap';

// style
import styled from 'styled-components';

// redux
import { useSelector } from 'react-redux';

// cookie
import { clearCookie, getCookie } from '../shared/cookie';

// router
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const navigate = useNavigate();
  const isLogin = getCookie('accessToken') ? true : false;

  useEffect(() => {
    if (!isLogin) navigate('/login');
  });

  // 회원정보 확인
  const userInfo = useSelector((state) => state.user.info);
  const logout = () => {
    clearCookie('accessToken');
    clearCookie('refreshToken');
    navigate('/');
  };

  return (
    <Wrap>
      <div>
        <span>마이페이지</span>
      </div>
      <Profile>
        <img src={userInfo.img} alt='' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        <span>{userInfo.nickname}</span>
      </Profile>
      <button type='button' onClick={logout}>
        로그아웃
      </button>
    </Wrap>
  );
};

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Mypage;
