import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import featured from "../featured.jpg";
import { mobile } from "../responsive";

function Featured() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/watch/17");
  };

  return (
    <Container>
      <Image src={featured} />
      <Info>
        <Desc>
          After more than thirty years of service as one of the Navy's top
          aviators, Pete Mitchell is where he belongs, pushing the envelope as a
          courageous test pilot and dodging the advancement in rank that would
          ground him.
        </Desc>
        <Button onClick={handleClick}>Play</Button>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  height: 80vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  width: 30%;
  position: absolute;
  left: 5em;
  bottom: 4em;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Desc = styled.span`
  margin: 20px 0px;
  font-size: 24px;
  ${mobile({ display: "none" })}
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  background-color: #f52747;
  color: white;
  cursor: pointer;
`;

export default Featured;
