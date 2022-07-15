// react
import React from 'react';

// axios
import instance from '../shared/axios';

// router
import { useNavigate } from 'react-router-dom';

// style
import styled from 'styled-components';

const RealTimeRank = () => {
  const navigate = useNavigate();
  const [rankers, setRankers] = React.useState([null, null]);

  React.useState(async () => {
    const list = await instance.get('/api/rank/day').catch((err) => console.log(err));
    // const list = await axios.get("http://localhost:5000/rank-now").catch((err) => console.log(err));
    list && setRankers(list.data);
  }, []);

  return (
    <RealTimeRanking>
      <h3>오늘의 인기상</h3>
      <RealTimeTopRanker>
        <RankerPreview
          img={rankers[0]?.img[0]?.url}
          onClick={() => navigate('/post/detail/' + rankers[0].boardMainId)}
        />
        vs
        <RankerPreview
          img={rankers[1]?.img[0]?.url}
          onClick={() => navigate('/post/detail/' + rankers[1].boardMainId)}
        />
      </RealTimeTopRanker>

      <VoteBar data={rankers} total={rankers[0]?.likeCnt + rankers[1]?.likeCnt}>
        <div> {rankers[0]?.likeCnt}표 </div>
        <div> {rankers[1]?.likeCnt}표 </div>
      </VoteBar>
    </RealTimeRanking>
  );
};

export default RealTimeRank;

const RealTimeRanking = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  h3 {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const RealTimeTopRanker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RankerPreview = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  background: #ddd;
  border-radius: 200px;

  background: url(${(props) =>
    props.img
      ? props.img
      : 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FopbGC%2FbtrF9ZNhpja%2FY026LUE8lwKcGmfqJiO3SK%2Fimg.png'});
  background-size: cover;
  background-position: center;

  cursor: pointer;
`;

const VoteBar = styled.div`
  height: 30px;
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    padding: 0px 20px;
  }

  & div:first-of-type {
    border-radius: 20px 0px 0px 20px;
    background: #44dcd3;
    width: ${(props) => (props?.data[0]?.likeCnt / props?.total) * 100}%;
  }

  & div:last-of-type {
    justify-content: flex-end;
    border-radius: 0px 20px 20px 0px;
    background: #ffcf23;
    width: ${(props) => (props?.data[1]?.likeCnt / props?.total) * 100}%;
  }
`;
