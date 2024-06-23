/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";

export const GET_NOW_PLAYING: string = "GET_NOW_PLAYING";
export const GET_TOP_RATED: string = "GET_TOP_RATED";
export const GET_DETAIL: string = "GET_DETAIL";
export const SET_LOADING: string = "SET_LOADING";
export const GET_FAVORITES: string = "GET_FAVORITES";
export const SET_TOTAL_FAVORITES: string = "SET_TOTAL_FAVORITES";
export const SET_FAVORITES: string = "SET_FAVORITES";
export const GET_WATCHLIST: string = "GET_WATCHLIST";
export const SET_TOTAL_WATCHLIST: string = "SET_TOTAL_WATCHLIST";
export const SET_WATCHLIST: string = "SET_WATCHLIST";
export const SET_MENU: string = "SET_MENU";

export interface IMovies {
  id: string;
  title: string;
  poster_path: string;
}

export interface IDetail {
  id: string | number;
  backdrop_path: string;
  tagline: string;
  title: string;
  release_date: string;
  overview: string;
}

export interface IMoviesState {
  now_playing: (IMovies | undefined)[];
  top_rated: (IMovies | undefined)[];
  favorites: (IMovies | undefined)[];
  favoritesCount: number;
  watchlists: (IMovies | undefined)[];
  detail: IDetail;
  loading: boolean;
  getMovies?: any;
  getMovie?: any;
  addToFavorite?: any;
  getFavorites?: any;
  getWatchlist?: any;
  addToWatchlist?: any;
  showMenu: boolean;
}

export interface IMoviesAction {
  type: string;
  payload: any;
}

export interface IMovieStateContext {
  state: Partial<IMoviesState>;
  dispatch: Dispatch<IMoviesAction>;
}
