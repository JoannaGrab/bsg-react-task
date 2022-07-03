import styled from "styled-components";
import Navbar from "../components/Navbar";
import Featured from "../components/Featured";
import Movies from "../components/Movies";

function Main() {
  return (
    <Container>
      <Navbar />
      <Featured />
      <Movies />
    </Container>
  );
}

const Container = styled.div`
  height: 80vh;
  position: relative;
`;

export default Main;
