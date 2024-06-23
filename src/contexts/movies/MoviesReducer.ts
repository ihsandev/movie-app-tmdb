import {
  GET_DETAIL,
  GET_FAVORITES,
  GET_NOW_PLAYING,
  GET_TOP_RATED,
  GET_WATCHLIST,
  IMoviesAction,
  IMoviesState,
  SET_FAVORITES,
  SET_MENU,
  SET_WATCHLIST,
} from "./MoviesTypes";

export default (
  state: IMoviesState,
  { type, payload }: IMoviesAction
): IMoviesState => {
  switch (type) {
    case SET_MENU:
      return {
        ...state,
        showMenu: payload,
      };
    case GET_NOW_PLAYING:
      return {
        ...state,
        loading: false,
        now_playing: payload,
      };

    case GET_TOP_RATED:
      return {
        ...state,
        loading: false,
        top_rated: payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        loading: false,
        detail: payload,
      };

    case GET_FAVORITES:
    case SET_FAVORITES:
      return {
        ...state,
        loading: false,
        favorites: payload,
      };

    case GET_WATCHLIST:
    case SET_WATCHLIST:
      return {
        ...state,
        loading: false,
        watchlists: payload,
      };

    default:
      return state;
  }
};
