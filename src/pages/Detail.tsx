import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MoviesContext from "../contexts/movies/MoviesContext";
import { IMAGE_PATH_URI } from "../utils/constans";
import styled from "styled-components";
import Wrapper from "../components/atoms/Wrapper";
import Button from "../components/atoms/Button";
import { checkIsFavorited } from "../utils/helpers";

const DetailMovie = () => {
  const params = useParams();
  const { state } = useContext(MoviesContext);

  useEffect(() => {
    state.getMovie(params?.id);
  }, [params]);

  const isFavorited = checkIsFavorited("favorites", state.detail?.id);

  return (
    <>
      {state.loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <HeroStyled bg={`${IMAGE_PATH_URI}${state.detail?.backdrop_path}`}>
            <Link to="/">
              <Button variant="danger">Back</Button>
            </Link>
            <h1>{state.detail?.tagline}</h1>
          </HeroStyled>
          <ContentWrapper>
            <Wrapper>
              <ContentHeader>
                <div className="btn-action">
                  <Button
                    variant={isFavorited ? "danger" : "success"}
                    onClick={() => {
                      state.addToFavorite({
                        media_type: "movie",
                        media_id: state.detail?.id,
                        favorite: isFavorited ? false : true,
                        movie: state.detail,
                      });
                    }}
                  >
                    {isFavorited ? "Remove Favorite" : "Add To Favorite"}
                  </Button>{" "}
                  <Button>Add To Watchlist</Button>
                </div>
              </ContentHeader>

              <ContentStyled>
                <img
                  src={`${IMAGE_PATH_URI}${state.detail?.backdrop_path}`}
                  alt={state.detail?.title}
                />
                <div>
                  <div>
                    <h1>{state.detail?.title}</h1>
                    <p>{state.detail?.tagline}</p>
                    <span>Release: {state.detail?.release_date}</span>
                  </div>
                  <p>{state.detail?.overview}</p>
                </div>
              </ContentStyled>
            </Wrapper>
          </ContentWrapper>
        </>
      )}
    </>
  );
};

interface IHero {
  bg: string;
}

const HeroStyled = styled.div<IHero>`
  width: 100%;
  height: 300px;
  overflow: hidden;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  > a button {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
`;

const ContentStyled = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ContentWrapper = styled.div`
  padding-bottom: 2rem;
  padding-top: 1rem;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: end;
  h1 {
    padding: 0;
    margin: 0;
  }
  .btn-action {
    display: flex;
    gap: 0.5rem;
  }
`;

export default DetailMovie;
