// element
import Wrap from '../elements/Wrap';

// style
import styled from 'styled-components';

// react
import { useEffect, useRef } from 'react';

// router
import { useNavigate } from 'react-router-dom';

// axios
import instance, { setAccessToken } from '../shared/axios';

// cookie
import { getCookie, setCookie } from '../shared/cookie';

const Login = () => {
  const navigate = useNavigate();

  const isLogin = getCookie('accessToken') ? true : false;

  useEffect(() => {
    if (isLogin) navigate('/');
  });

  const eamilValue = useRef('');
  const pwdValue = useRef('');

  const login = async userInfo => {
    try {
      const response = await instance.post('/user/login', userInfo);
      setCookie('accessToken', response.data.data.token.accessToken);
      setCookie('refreshToken', response.data.data.token.refreshToken);
      alert(response.data.msg);
      setAccessToken();
      navigate('/');
      // dispatch(setUserDB());
    } catch (error) {
      window.alert(error.response.data.errorMessage);
      navigate('/login');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const email = eamilValue.current;
    const password = pwdValue.current;

    if (email.value.trim().length === 0) {
      email.focus();
      return;
    }

    if (password.value.trim().length === 0) {
      password.focus();
      return;
    }

    // axios 통신
    const userInfo = { username: email.value, password: password.value };
    login(userInfo);

    email.value = '';
    password.value = '';
  };

  return (
    <Wrap>
      <Container>
        <Logo>로고</Logo>
        <LoginForm onSubmit={handleSubmit}>
          <input ref={eamilValue} className='username' type='text' placeholder='이메일' />
          <input ref={pwdValue} className='password' type='password' placeholder='비밀번호' />
          <Buttons>
            <button onClick={() => handleSubmit}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button>
          </Buttons>
          <div className='findPwd' onClick={() => navigate('/findinfo')}>
            비밀번호 찾기
          </div>
          <SimpleLogin>
            <span>간편 로그인</span>
            <SocialButtons>
              <div className='naver'>네이버</div>
              <div className='google'>구글</div>
              <div className='kakao'>카카오</div>
            </SocialButtons>
          </SimpleLogin>
        </LoginForm>
      </Container>
    </Wrap>
  );
};

const Container = styled.div`
  height: 100%;
  padding-top: 78px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input,
  button {
    width: 226px;
    height: 50px;
    border-radius: 10px;
    border: none;
    outline: none;
    font-size: inherit;
  }
  button {
    cursor: pointer;
  }
  input:first-of-type,
  button:first-of-type {
    margin-bottom: 5px;
  }
  input {
    background-color: #ccc;
  }

  .findPwd {
    margin-bottom: 91px;
  }
`;

const Logo = styled.div`
  width: 86px;
  height: 36px;
  margin-bottom: 73px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0 20px 0;
`;

const SimpleLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 255px;
  padding: 20px 0 15px 0;
  border-top: 1px solid #ccc;
  span {
    font-size: 14px;
  }
`;
const SocialButtons = styled.div`
  display: flex;
  margin-top: 15px;
  div {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    cursor: pointer;
    background-color: #ccc;
  }
  .google {
    margin: 0 12px;
  }
`;
export default Login;
