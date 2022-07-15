// element
import Wrap from '../elements/Wrap';
import SubHeader from '../elements/SubHeader';

// style
import styled from 'styled-components';

// redux
import { useSelector } from 'react-redux';

const Notice = () => {
  const notices = useSelector((state) => state.notice.list);

  return (
    <Wrap>
      <SubHeader title='공지사항'></SubHeader>

      {notices.map((v) => (
        <Banner key={v.id} img={v.img} />
      ))}
    </Wrap>
  );
};

export default Notice;

const Banner = styled.div`
  height: 240px;
  min-width: 100%;
  background: ${(props) => (props.img ? `url(${props.img})` : '#ddd')} no-repeat center;
  background-size: cover;

  margin-bottom: 20px;
`;
