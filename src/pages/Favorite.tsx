import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/atoms/MovieCard";
import MoviesContext from "../contexts/movies/MoviesContext";
import { IMAGE_PATH_URI } from "../utils/constans";
import { MoviesStyled } from "./Movies";
import { checkIsFavorited } from "../utils/helpers";

const Favorite = () => {
  const { state } = useContext(MoviesContext);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    }
  }, [cookies.token, navigate]);

  useEffect(() => {
    state.getFavorites();
  }, []);

  return (
    <MoviesStyled>
      {state.loading ? (
        <span>loading...</span>
      ) : (
        state.favorites?.map((favorite) => (
          <MovieCard
            key={favorite?.id}
            movie_id={favorite?.id}
            title={favorite?.title}
            image={`${IMAGE_PATH_URI}${favorite?.poster_path}`}
            placementTooltip="bottom"
            onFavorite={() => {
              state.addToFavorite({
                media_type: "movie",
                media_id: favorite?.id,
                favorite: checkIsFavorited("favorites", favorite?.id)
                  ? false
                  : true,
                movie: favorite,
              });
            }}
          />
        ))
      )}
    </MoviesStyled>
  );
};

export default Favorite;
