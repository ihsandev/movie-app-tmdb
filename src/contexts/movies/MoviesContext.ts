import { createContext } from "react";
import { IMovieStateContext } from "./MoviesTypes";

export default createContext<IMovieStateContext>({
  state: {},
  dispatch: () => undefined,
});
