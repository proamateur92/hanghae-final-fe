// react
import { useState } from "react";

// style
import styled from "styled-components";

// elements
import Wrap from "../elements/Wrap";
import UserTop from "../elements/UserTop";
import StepPhone from "../components/Step/StepPhone";

// sweetalert
import Swal from "sweetalert2";

// axios
import instance from "../shared/axios";

// router
import { useNavigate } from "react-router-dom";
import StepPassword from "../components/Step/StepPassword";
import { useEffect } from "react";

const FindPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({ phoneNumber: "", password: "" });
  const [validation, setValidation] = useState({ phoneNumber: false, password: false });
  const [isDuplicated, setIsDuplicated] = useState({ phoneNumber: false });
  const [phoneMessage, setPhoneMessage] = useState(false);
  const [authMessage, setAuthMessage] = useState(false);
  const [isSendCode, setIsSendCode] = useState(false);
  const userInfoArr = ["phoneNumber", "password"];
  const curData = userInfoArr[step];

  const handleSetPhoneMessage = (value) => {
    setPhoneMessage(value);
  };

  // 핸드폰으로 코드 받기
  const sendCode = async () => {
    try {
      await instance.get(`/user/send/phoneVerification/${userInfo.phoneNumber}`);
      Swal.fire({
        title: "인증번호를 발송했어요!",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#44DCD3",
      });
      setIsSendCode(true);
      setAuthMessage(false);
    } catch (error) {
      console.log(error);
    }
  };

  // 인증 코드 대기
  const [waitSendCodeTime, setWaitSendCodeTime] = useState(false);
  const [leftTime, setLeftTime] = useState(5);

  // 사용자 입력 중복체크
  const handleInputDuplicated = async () => {
    if (curData === "phoneNumber") {
      if (waitSendCodeTime) {
        Swal.fire({
          title: `${leftTime}초 후에 요청이 가능해요.`,
          icon: "warning",
          confirmButtonText: "확인",
          confirmButtonColor: "#44DCD3",
        });
        return;
      }

      try {
        const response = await instance.get(`/user/checkPhoneNumber/${userInfo.phoneNumber}`);
        // 존재하면 true
        // 존재하지 않으면 false
        if (!response.data) {
          setIsDuplicated({ ...isDuplicated, [curData]: !response.data });
          return;
        }
        setIsDuplicated({ ...isDuplicated, [curData]: !response.data });
        setWaitSendCodeTime(true);

        setTimeout(() => {
          setWaitSendCodeTime(false);
        }, 5000);

        const stopLeftTime = setInterval(() => {
          setLeftTime((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(stopLeftTime);
          setLeftTime(5);
        }, 5000);

        setIsSendCode(true);
        sendCode();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 유효성 검사 함수
  const checkValidation = (value) => {
    let regExp = "";

    switch (curData) {
      case "password": {
        regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        break;
      }
      case "phoneNumber": {
        regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{5})$/;
        break;
      }
      default: {
        return;
      }
    }

    const result = regExp.test(value);
    setValidation({ ...validation, [curData]: result });
  };

  // 입력 값 유저 정보 state에 넣기
  const handleEnteredInfo = async (event) => {
    // 숫자 이외의 값 입력 방지
    if (curData === "phoneNumber") {
      if (isNaN(Number(event.target.value))) {
        return;
      }
    }

    // 핸드폰 번호 중복 여부 갱신
    if (curData === "phoneNumber") {
      setIsDuplicated({ ...isDuplicated, [curData]: false });
      if (curData === "phoneNumber") {
        setIsDuplicated({ ...isDuplicated, [curData]: false });
        setPhoneMessage(false);
        setAuthMessage(false);
        setIsSendCode(false);
      }
    }

    // img 외의 값 유효성 검사
    checkValidation(event.target.value);
    setUserInfo({ ...userInfo, [curData]: event.target.value });
  };

  // 인증코드 입력
  const [authNumber, setAuthNumber] = useState("");

  // 인증번호 입력 값
  const handleSetAuthNumber = (event) => {
    setAuthNumber(event.target.value);
  };

  // 인증번호 일치 여부 확인
  const checkedAuthNumber = async () => {
    if (isDuplicated.phoneNumber || !isSendCode) {
      setAuthMessage(true);
      return;
    }

    setAuthMessage(false);

    try {
      const response = await instance.post("/user/confirm/phoneVerification", {
        phoneNumber: userInfo.phoneNumber,
        numStr: authNumber,
      });

      // 인증코드가 일치하면 true, 다르면 false
      if (!response.data) {
        Swal.fire({
          title: "인증번호가 일치하지 않아요!",
          icon: "warning",
          confirmButtonText: "확인",
          confirmButtonColor: "#44DCD3",
        });
      }
      response.data && setStep((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  let content = "";
  let buttons = "";

  if (step === 0) {
    content = (
      <StepPhone
        step={step}
        userPhoneNumber={userInfo[curData]}
        validation={validation[curData]}
        isDuplicated={isDuplicated[curData]}
        authMessage={authMessage}
        phoneMessage={phoneMessage}
        setPhoneMessage={handleSetPhoneMessage}
        handleInputDuplicated={handleInputDuplicated}
        setEnteredPhoneNumber={handleEnteredInfo}
        setAuthNumber={handleSetAuthNumber}
        authNumber={authNumber}
      />
    );
    buttons = (
      <ButtonBox step={step} width="100%" validation={validation[curData]}>
        <NextBtn onClick={() => checkedAuthNumber()}>다음</NextBtn>
      </ButtonBox>
    );
  }

  // 비밀번호 보이기, 안보이기
  const [isShowPassword, setIsShowPassword] = useState(false);

  // 패스워드 일치 여부
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [passwordCheckValue, setPasswordCheckValue] = useState("");

  // 비밀번호 확인 값
  const handleEnteredPwdCheck = (event) => {
    setPasswordCheckValue(event.target.value);
  };

  const handleSetIsShowPassword = (value) => {
    setIsShowPassword(value);
  };

  // 비밀번호 일치 확인
  useEffect(() => {
    if (validation.password && userInfo.password === passwordCheckValue) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [validation.password, userInfo.password, passwordCheckValue]);

  // 유저 비밀번호 변경
  const handleUserPasswordChange = async () => {
    try {
      await instance.post("/user/make/newPassword", {
        phoneNumber: userInfo.phoneNumber,
        newPassword: userInfo.password,
      });
      Swal.fire({
        title: "비밀번호를 변경했어요!",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#44DCD3",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      navigate("/user/findPassword");
    }
  };

  if (step === 1) {
    content = (
      <StepPassword
        mode="update"
        userPassword={userInfo[curData]}
        setEnteredPassword={handleEnteredInfo}
        validation={validation[curData]}
        isShowPassword={isShowPassword}
        passwordMatch={passwordMatch}
        passwordCheckValue={passwordCheckValue}
        setEnteredPasswordCheckValue={handleEnteredPwdCheck}
        setIsShowPassword={handleSetIsShowPassword}
      />
    );
    buttons = (
      <ButtonBox step={step} width="100%" validation={passwordMatch}>
        <NextBtn onClick={() => passwordMatch && handleUserPasswordChange()}>다음</NextBtn>
      </ButtonBox>
    );
  }

  return (
    <Wrap>
      <FindForm>
        <UserTop title="비밀번호 재설정" type="find" />
        <Container>
          {content}
          {buttons}
        </Container>
      </FindForm>
    </Wrap>
  );
};

const FindForm = styled.div`
  width: 95%;
  margin: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vw;
  padding: 10% 5% 0 5%;
  font-size: 1.8rem;
  .desc {
    margin-bottom: 3%;
  }
  p:first-of-type {
    display: block;
    margin-bottom: 2%;
  }
  .strong {
    font-weight: bold;
  }
`;

const PrevBtn = styled.button``;
const NextBtn = styled.button``;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 47%;
    padding: 15px;
    background-color: #ccc;
    border-radius: 10px;
    font-weight: 800;
    color: #333333;
  }
  ${PrevBtn} {
    transition: 0.5s;
    background-color: #f2f2f2;
  }
  ${PrevBtn}:hover {
    background-color: ${(props) => props.theme.color.activeBtn};
  }
  ${NextBtn} {
    width: ${(props) => props.width};
    background-color: ${(props) => (props.validation ? props.theme.color.activeBtn : props.theme.color.inactiveBtn)};
    cursor: ${(props) => props.validation && "pointer"};
    transition: 0.5s;
  }
`;

export default FindPassword;
