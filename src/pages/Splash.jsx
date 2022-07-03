import background from "../BackGround.jpeg";
import logo from "../BSG-Logo.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getFreshToken } from "../authToken";
import { useNavigate } from "react-router-dom";

function Splash() {
  const [showError, setShowError] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    getFreshToken(
      () => {
        navigate("/main");
      },
      () => setShowError(true)
    );
  }, [navigate]);

  return (
    <Container>
      <Logo src={logo} />
      {!showError && <Text>Loading...</Text>}
      {showError && <Text>Something went wrong. Please try again later.</Text>}
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Logo = styled.img``;

const Text = styled.h1`
  margin-top: 2em;
`;

export default Splash;
