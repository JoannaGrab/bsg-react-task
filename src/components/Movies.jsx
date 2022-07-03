import styled from "styled-components";
import List from "../components/List";

function Movies() {
  return (
    <Container>
      <List />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #272728;
  padding: 2em;
`;

export default Movies;
