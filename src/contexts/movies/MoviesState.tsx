/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, Reducer, useCallback, useMemo, useReducer } from "react";
import { useCookies } from "react-cookie";
import { API_CALL } from "../../utils/api";
import {
  addToLocalStorage,
  removeFromStorage,
  updateStorage,
} from "../../utils/helpers";
import MoviesContext from "./MoviesContext";
import MoviesReducer from "./MoviesReducer";
import {
  GET_DETAIL,
  GET_FAVORITES,
  GET_NOW_PLAYING,
  GET_SEARCH_MOVIE,
  GET_TOP_RATED,
  GET_WATCHLIST,
  IMoviesAction,
  IMoviesState,
  SET_FAVORITES,
  SET_TOTAL_FAVORITES,
  SET_TOTAL_WATCHLIST,
  SET_WATCHLIST,
} from "./MoviesTypes";
import { toast } from "react-toastify";

const MovieState = ({ children }: { children: ReactNode }) => {
  const initialState: IMoviesState = {
    now_playing: [],
    top_rated: [],
    favorites: [],
    watchlists: [],
    searchMovies: [],
    favoritesCount: 0,
    detail: {
      id: "",
      backdrop_path: "",
      tagline: "",
      title: "",
      release_date: "",
      overview: "",
    },
    loading: true,
    showMenu: false,
  };

  const [cookies] = useCookies(["accountId"]);

  const [state, dispatch] = useReducer<Reducer<IMoviesState, IMoviesAction>>(
    MoviesReducer,
    initialState
  );

  const getMovies = async (type: string, page: number = 1) => {
    try {
      const res = await API_CALL({ url: `/3/movie/${type}?page=${page}` });
      if (type === "now_playing") {
        dispatch({ type: GET_NOW_PLAYING, payload: res.data.results });
      } else {
        dispatch({ type: GET_TOP_RATED, payload: res.data.results });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMovie = async (id: string | undefined) => {
    try {
      const res = await API_CALL({ url: `/3/movie/${id}` });
      dispatch({ type: GET_DETAIL, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const searchMovie = async (params: any) => {
    try {
      const res = await API_CALL(`/3/search/movie`, {
        params,
      });
      if (res.status === 200) {
        dispatch({ type: GET_SEARCH_MOVIE, payload: res.data?.results });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorite = useCallback(
    async (data: any) => {
      try {
        const res = await API_CALL.post(
          `/3/account/${cookies.accountId}/favorite`,
          {
            media_type: data.media_type,
            media_id: data.media_id,
            favorite: data.favorite,
          }
        );
        if (res.status === 201 && data.favorite) {
          toast.success("Yey.. Your Favorite Saved !", {
            autoClose: 700,
          });
          updateFavorite(data.movie);
        }
        if (res.status === 200 && !data.favorite) {
          toast.success("Ups.. You Remove it !", {
            autoClose: 500,
          });
          removeFavorite(data.media_id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [cookies.accountId]
  );

  const addToWatchlist = useCallback(
    async (data: any) => {
      try {
        const res = await API_CALL.post(
          `/3/account/${cookies.accountId}/watchlist`,
          {
            media_type: data.media_type,
            media_id: data.media_id,
            watchlist: data.watchlist,
          }
        );
        if (res.status === 201 && data.watchlist) {
          toast.success("Yey.. Your watchlist Saved !", {
            autoClose: 700,
          });
          updateWatchlist(data.movie);
        }
        if (res.status === 200 && !data.watchlist) {
          toast.success("Ups.. You Remove it !", {
            autoClose: 500,
          });
          removeWatchlist(data.media_id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [cookies.accountId]
  );

  const getFavorites = useCallback(async () => {
    try {
      const res = await API_CALL(
        `3/account/${cookies.accountId}/favorite/movies`
      );
      dispatch({ type: GET_FAVORITES, payload: res.data.results });
      dispatch({ type: SET_TOTAL_FAVORITES, payload: res.data.total_results });
      addToLocalStorage("favorites", res.data.results);
    } catch (error) {
      console.log(error);
    }
  }, [cookies.accountId]);

  const getWatchlist = useCallback(async () => {
    try {
      const res = await API_CALL(
        `3/account/${cookies.accountId}/watchlist/movies`
      );
      dispatch({ type: GET_WATCHLIST, payload: res.data.results });
      dispatch({ type: SET_TOTAL_WATCHLIST, payload: res.data.total_results });
      addToLocalStorage("watchlists", res.data.results);
    } catch (error) {
      console.log(error);
    }
  }, [cookies.accountId]);

  const updateFavorite = (data?: any) => {
    return updateStorage({
      type: SET_FAVORITES,
      storageName: "favorites",
      data,
      dispatch,
    });
  };

  const removeFavorite = (paramId?: any) => {
    return removeFromStorage({
      paramId,
      storageName: "favorites",
      type: SET_FAVORITES,
      dispatch,
    });
  };

  const updateWatchlist = (data?: any) => {
    return updateStorage({
      type: SET_WATCHLIST,
      storageName: "watchlists",
      data,
      dispatch,
    });
  };

  const removeWatchlist = (paramId?: any) => {
    return removeFromStorage({
      paramId,
      storageName: "watchlists",
      type: SET_WATCHLIST,
      dispatch,
    });
  };

  const value = useMemo(
    () => ({
      state: {
        ...state,
        getMovies,
        getMovie,
        addToFavorite,
        getFavorites,
        getWatchlist,
        addToWatchlist,
        searchMovie,
      },
      dispatch,
    }),
    [addToFavorite, addToWatchlist, getFavorites, getWatchlist, state]
  );

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export default MovieState;
