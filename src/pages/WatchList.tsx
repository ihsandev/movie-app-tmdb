import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MoviesContext from "../contexts/movies/MoviesContext";
import { MoviesStyled } from "./Movies";
import MovieCard from "../components/atoms/MovieCard";
import { IMAGE_PATH_URI } from "../utils/constans";
import { checkIsFavorited } from "../utils/helpers";

const WatchList = () => {
  const { state } = useContext(MoviesContext);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    }
  }, [cookies.token, navigate]);

  useEffect(() => {
    state.getWatchlist();
  }, []);

  return (
    <MoviesStyled>
      {state.loading ? (
        <span>loading...</span>
      ) : (
        state.watchlists?.map((watchlist) => (
          <MovieCard
            key={watchlist?.id}
            movie_id={watchlist?.id}
            title={watchlist?.title}
            image={`${IMAGE_PATH_URI}${watchlist?.poster_path}`}
            placementTooltip="bottom"
            onWatchlist={() => {
              state.addToWatchlist({
                media_type: "movie",
                media_id: watchlist?.id,
                watchlist: checkIsFavorited("watchlists", watchlist?.id)
                  ? false
                  : true,
                movie: watchlist,
              });
            }}
          />
        ))
      )}
    </MoviesStyled>
  );
};

export default WatchList;
