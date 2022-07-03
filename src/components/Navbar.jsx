import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/bsgLogo.svg";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Wrapper className={isScrolled ? "navbar scrolled" : "navbar"}>
      <Container>
        <Left>
          <Logo src={logo} />
          <Link>Home</Link>
          <Link>Series</Link>
          <Link>Movies</Link>
          <Link>New</Link>
          <Link>My List</Link>
        </Left>
        <Right></Right>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  color: white;
  position: fixed;
  top: 0;
  z-index: 999;
`;

const Container = styled.div`
  padding: 0px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  margin: 10px 0px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  margin-right: 40px;
`;

const Link = styled.span`
  margin-right: 50px;
  font-size: 20px;
  cursor: pointer;
`;

export default Navbar;
