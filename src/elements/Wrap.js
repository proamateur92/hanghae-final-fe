import styled from 'styled-components';

const Wrap = props => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`
  max-width: 599px;
  height: 844px;
  margin: 0 auto;
  border: 2px solid black;
`;

export default Wrap;
