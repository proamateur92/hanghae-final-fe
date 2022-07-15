// CSS 관련 임포트
import styled from 'styled-components';

const SubHeader = (props) => {
  return (
    <HeaderWrap>
      <span>{ props.title }</span>
      { props.children }
    </HeaderWrap>
  );
};

export default SubHeader;

const HeaderWrap = styled.div`
box-sizing: border-box;
width: 100%;
padding: 20px;
border-bottom: 2px solid rgba(0, 0, 0, 0.1);
font-size: 20px;

display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  border: 1px solid #efefef;

  h3 {
    font-weight: bold;
  }
`
