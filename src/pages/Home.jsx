import styled from "styled-components";
import Navbar from "../components/Navbar";
import Featured from "../components/Featured";
import Videos from "../components/Videos";

function Home() {
  return (
    <Container>
      <Navbar />
      <Featured />
      <Videos />
    </Container>
  );
}

const Container = styled.div`
  height: 80vh;
  position: relative;
`;

export default Home;
