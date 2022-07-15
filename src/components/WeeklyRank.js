// react
import React from 'react';

// style
import styled from 'styled-components';

// axios
import instance from '../shared/axios';

const WeeklyRank = () => {
  const [category, setCategory] = React.useState('cute');
  const [list, setList] = React.useState([null, null, null]);
  const [totalVote, setTotalVote] = React.useState(0);

  React.useEffect(() => {
    changeCategory(category);
  }, [category]);

  const changeCategory = async (categoryName) => {
    const response = await instance.get('/api/rank/week/' + categoryName).catch((err) => console.log(err));
    setList(response.data);
    setTotalVote(response.data.reduce((acc, ranker) => acc + ranker.likeCnt, 0));
    setCategory(categoryName);
  };

  return (
    <WeeklyRankWrap>
      <CategoryTitle category={category}>
        <span id='cute' onClick={() => changeCategory('cute')}>
          귀여움
        </span>

        <span id='cool' onClick={() => changeCategory('cool')}>
          멋짐
        </span>

        <span id='pretty' onClick={() => changeCategory('pretty')}>
          예쁨
        </span>

        <span id='comic' onClick={() => changeCategory('comic')}>
          웃김
        </span>
      </CategoryTitle>

      {list.map((ranker, i) => (
        <CategoryRanking key={ranker ? ranker.boardMainId : i}>
          <div className='cateRankerPic' img={ranker?.img[0]?.url} />
          <div>
            <span>{i + 1}위</span> {ranker?.userNickname}
            <VoteBar votes={ranker?.likeCnt} totalVote={totalVote}>
              {' '}
              {ranker?.likeCnt}표{' '}
            </VoteBar>
          </div>
        </CategoryRanking>
      ))}
    </WeeklyRankWrap>
  );
};

export default WeeklyRank;

const WeeklyRankWrap = styled.div``;

const CategoryRanking = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ddd;

  .cateRankerPic {
    width: 80px;
    height: 80px;
    margin: 10px;
    border-radius: 80px;

    background: url(${(props) =>
      props.img
        ? props.img
        : 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FopbGC%2FbtrF9ZNhpja%2FY026LUE8lwKcGmfqJiO3SK%2Fimg.png'});
    background-size: cover;
    background-position: center;
  }
`;
const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
    cursor: pointer;
  }

  #${(props) => props.category} {
    border-bottom: 2px solid #44dcd3;
    font-weight: bolder;
  }
`;

const VoteBar = styled.div`
  height: 30px;
  background: #44dcd3;
  border-radius: 30px;
  margin: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 20px;
  width: ${(props) => (props.votes / props.totalVote) * 100}%;
`;
