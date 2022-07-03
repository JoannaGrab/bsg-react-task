import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import { getFreshToken } from "../authToken";
import { bsgAPI } from "../bsgAPI";
import videoPlaceholder from "../assets/videoPlaceholder.png";

function List() {
  const [videosList, setVideosList] = useState({ nextListId: 2, videos: [] });
  const [showError, setShowError] = useState(false);
  const [showVideosList, setShowVideosList] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (videosList.videos.length < 15 && videosList.nextListId <= 7) {
      getFreshToken(
        (token) => {
          bsgAPI.getMediaList(
            token.value,
            videosList.nextListId,
            15 - videosList.videos.length,
            (videos) => {
              setVideosList({
                nextListId: (videosList.nextListId += 1),
                videos: videosList.videos.concat(videos.Entities),
              });
              setShowVideosList(true);
            },
            () => setShowError(true)
          );
        },
        () => setShowError(true)
      );
    }
  }, [videosList, videosList.videos.length]);

  return (
    <div>
      {!showVideosList && <Text>Loading...</Text>}
      {showVideosList && (
        <ListContainer>
          <ListTitle>Favourite videos</ListTitle>
          {showError && (
            <Text>Something went wrong. Please try again later.</Text>
          )}
          {!showError && (
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              containerClass="container-with-dots"
              draggable
              focusOnSelect={false}
              infinite={false}
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              ssr
              partialVisible
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 3,
                  partialVisibilityGutter: 40,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 0,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              slidesToSlide={1}
              swipeable
            >
              {videosList.videos.map((movie) => (
                <Media
                  key={movie.Id}
                  onClick={() => {
                    navigate(`/play/${movie.Id}`);
                  }}
                >
                  <MediaTitle>{movie.Title}</MediaTitle>
                  <MediaImage src={getMediaImage(movie.Images)} />
                </Media>
              ))}
            </Carousel>
          )}
        </ListContainer>
      )}
    </div>
  );
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  color: white;
`;

const ListTitle = styled.h1`
  margin-bottom: 1.5em;
`;

const Media = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-right: 1em;
`;

const MediaTitle = styled.h3`
  margin-bottom: 1.5em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`;

const MediaImage = styled.img`
  aspect-ratio: 16/9;
  object-fit: cover;
  object-position: left;
`;

const Text = styled.h1`
  text-align: center;
  font-weight: 300;
  color: white;
`;

function getMediaImage(media) {
  try {
    const image = media.find((img) => img.ImageTypeCode === "FRAME");
    if (!image || !image.Url) {
      return videoPlaceholder;
    }
    return image.Url;
  } catch {
    return videoPlaceholder;
  }
}

export default List;
