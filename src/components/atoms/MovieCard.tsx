/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";
import { checkIsFavorited, slugify } from "../../utils/helpers";
import { Tooltip } from "react-tooltip";
import { useCookies } from "react-cookie";
import { device } from "../../utils/constans";

interface IMovieCard {
  movie_id: string | undefined;
  title: string | undefined;
  image: string;
  onFavorite?: any;
  onWatchlist?: any;
  placementTooltip?: any;
}

const MovieCard = ({
  title,
  image,
  movie_id,
  onFavorite,
  onWatchlist,
  placementTooltip,
}: IMovieCard) => {
  const [cookies] = useCookies(["token"]);
  const isFavorited = checkIsFavorited("favorites", movie_id);
  const isWatchlisted = checkIsFavorited("watchlists", movie_id);
  return (
    <MovieCardStyled>
      <img src={image} alt={title} width="100%" />
      <h3>{title}</h3>
      {cookies.token ? (
        <MovieACardctionStyled>
          <a
            onClick={onFavorite}
            id={isFavorited ? "unfavorite-btn" : "favorite-btn"}
          >
            {isFavorited ? "❤️" : "🖤"}
          </a>

          <Tooltip
            anchorSelect={isFavorited ? "#unfavorite-btn" : "#favorite-btn"}
            place={placementTooltip}
          >
            {isFavorited ? "Remove From Favorite" : "Add To Favorite"}
          </Tooltip>
          <a
            onClick={onWatchlist}
            id={isWatchlisted ? "unwatchlist-btn" : "watchlist-btn"}
          >
            {isWatchlisted ? "✅" : "🎥"}
          </a>
          <Tooltip
            anchorSelect={isWatchlisted ? "#unwatchlist-btn" : "#watchlist-btn"}
            place={placementTooltip}
          >
            {isWatchlisted ? "Remove From Watchlist" : "Add To Watchlist"}
          </Tooltip>
        </MovieACardctionStyled>
      ) : null}
      <MovieCardDetailActionStyled>
        <Link
          key={movie_id}
          to={{
            pathname: `/${slugify(title)}/${movie_id}`,
          }}
        >
          <Button>See Details</Button>
        </Link>
      </MovieCardDetailActionStyled>
    </MovieCardStyled>
  );
};

const MovieCardStyled = styled.div`
  width: 250px;
  transition: all;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: rgba(255, 191, 0, 0.25) 0px 50px 100px -20px,
      rgba(37, 20, 0, 0.3) 0px 30px 60px -30px,
      rgba(64, 48, 10, 0.35) 0px -2px 6px 0px inset;
    transform: translateY(-10px);
  }
  box-sizing: border-box;
  position: relative;
  > h3 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a {
    text-decoration: none;
  }
  #favorite-btn,
  #unfavorite-btn,
  #watchlist-btn,
  #unwatchlist-btn {
    cursor: pointer;
  }

  @media ${device.sm} {
    width: 196px;
    margin: 0 auto;
    gap: 0.5rem;
  }
`;

const MovieACardctionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 1.2rem;
  background-color: #ffffff;
  padding: 0.1rem 0.5rem;
  border-radius: 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  > span {
    cursor: pointer;
  }
`;

const MovieCardDetailActionStyled = styled.div`
  display: flex;
  bottom: 5.5rem;
  width: 100%;
  position: absolute;
  flex-direction: column;
  align-items: center;
`;

export default MovieCard;
