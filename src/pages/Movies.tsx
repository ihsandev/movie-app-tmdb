import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/atoms/MovieCard";
import MoviesContext from "../contexts/movies/MoviesContext";
import { device, IMAGE_PATH_URI } from "../utils/constans";
import { checkIsFavorited } from "../utils/helpers";
import Button from "../components/atoms/Button";

const Movies = () => {
  const { state } = useContext(MoviesContext);
  const [page, setPage] = useState(1);
  const { getMovies, loading, now_playing, top_rated, addToFavorite } = state;

  useEffect(() => {
    getMovies("now_playing", page);
    getMovies("top_rated", page);
  }, [page]);

  return (
    <>
      <MoviesHeaderStyled>
        <h1>Now Playing</h1>
        <div>
          {page > 1 && (
            <Button variant="warning" onClick={() => setPage(page - 1)}>
              Prev
            </Button>
          )}
          <Button variant="warning" onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </MoviesHeaderStyled>
      <MoviesStyled>
        {loading ? (
          <span>loading...</span>
        ) : (
          now_playing?.map((movie) => (
            <MovieCard
              key={movie?.id}
              movie_id={movie?.id}
              title={movie?.title}
              image={`${IMAGE_PATH_URI}${movie?.poster_path}`}
              onFavorite={() => {
                addToFavorite({
                  media_type: "movie",
                  media_id: movie?.id,
                  favorite: checkIsFavorited("favorites", movie?.id)
                    ? false
                    : true,
                  movie,
                });
              }}
              onWatchlist={() => {
                state.addToWatchlist({
                  media_type: "movie",
                  media_id: movie?.id,
                  watchlist: checkIsFavorited("watchlists", movie?.id)
                    ? false
                    : true,
                  movie,
                });
              }}
            />
          ))
        )}
      </MoviesStyled>
      <h1>Top Rated Movies</h1>
      <MoviesStyled>
        {loading ? (
          <span>loading...</span>
        ) : (
          top_rated?.map((movie) => (
            <MovieCard
              key={movie?.id}
              movie_id={movie?.id}
              title={movie?.title}
              image={`${IMAGE_PATH_URI}${movie?.poster_path}`}
              onFavorite={() => {
                addToFavorite({
                  media_type: "movie",
                  media_id: movie?.id,
                  favorite: checkIsFavorited("favorites", movie?.id)
                    ? false
                    : true,
                  movie,
                });
              }}
              onWatchlist={() => {
                state.addToWatchlist({
                  media_type: "movie",
                  media_id: movie?.id,
                  watchlist: checkIsFavorited("watchlists", movie?.id)
                    ? false
                    : true,
                  movie,
                });
              }}
            />
          ))
        )}
      </MoviesStyled>
    </>
  );
};

const MoviesHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    position: fixed;
    background-color: ${(props) => props.theme?.mainColor};
    border-radius: 10px;
    bottom: 2rem;
    right: 7rem;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 9;
    @media ${device.sm} {
      right: 1rem;
    }
  }
  h1 {
    color: #e9e90c;
  }
`;

export const MoviesStyled = styled.div`
  padding-top: 1rem;
  color: white;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
`;

export default Movies;
