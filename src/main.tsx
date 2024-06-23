import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Movies from "./pages/Movies";
import Layout from "./layout";
import WatchList from "./pages/WatchList";
import Favorite from "./pages/Favorite";
import { ThemeProvider } from "styled-components";
import MovieState from "./contexts/movies/MoviesState";
import DetailMovie from "./pages/Detail";
import { CookiesProvider } from "react-cookie";

const theme = {
  mainColor: "#0D2552",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <ThemeProvider theme={theme}>
        <MovieState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Movies />} />
                <Route path="/watchlists" element={<WatchList />} />
                <Route path="/favorites" element={<Favorite />} />
              </Route>
              <Route path="/:slug/:id" element={<DetailMovie />} />
            </Routes>
          </BrowserRouter>
        </MovieState>
      </ThemeProvider>
    </CookiesProvider>
  </React.StrictMode>
);
