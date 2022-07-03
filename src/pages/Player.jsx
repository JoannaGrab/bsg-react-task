import "../App.css";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { getFreshToken } from "../authToken";
import { bsgAPI } from "../bsgAPI";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";

function Player() {
  const [mediaUrl, setMediaUrl] = useState("");
  const [showError, setShowError] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    getFreshToken(
      (token) => {
        try {
          bsgAPI.getMediaPlayInfo(
            token.value,
            Number(id),
            (media) => {
              if (media.ContentUrl) {
                setMediaUrl(media.ContentUrl);
              } else {
                setShowError(true);
              }
            },
            () => setShowError(true)
          );
        } catch {
          setShowError(true);
        }
      },
      () => setShowError(true)
    );
  });
  return (
    <Container>
      <Navbar />
      {showError && <Text>Something went wrong. Please try again later.</Text>}
      {!showError && (
        <ReactPlayer
          className="react-player"
          url={mediaUrl}
          controls={true}
          width="100%"
          height="90vh"
          onError={() => setShowError(true)}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.h1`
  text-align: center;
  font-weight: 300;
  margin-top: 40vh;
`;

export default Player;
