import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/tmdb_logo.svg";
import { device } from "../../utils/constans";
import Button from "../atoms/Button";
import Login from "./Login";
import SidebarMobile from "./SidebarMobile";
import { useContext, useEffect, useState } from "react";
import MoviesContext from "../../contexts/movies/MoviesContext";
import { SET_MENU } from "../../contexts/movies/MoviesTypes";

const Header = () => {
  const [cookies] = useCookies(["token"]);
  const { state, dispatch } = useContext(MoviesContext);
  const [keyword, setKeyword] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    state.searchMovie({ query: keyword });
  }, [keyword]);

  return (
    <HeaderWrapperStyled>
      <HeaderStyled>
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="logo" width={150} />
          </Link>
          {pathname === "/" && (
            <div>
              <input
                placeholder="Search Movie..."
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          )}
        </div>
        <nav>
          <NavStyled>
            {cookies.token ? (
              <>
                <NavListStyled active={pathname === "/favorites"}>
                  <Link to="/favorites">Favorite</Link>
                </NavListStyled>
                <NavListStyled active={pathname === "/watchlists"}>
                  <Link to="/watchlists">WatchList</Link>
                </NavListStyled>
              </>
            ) : null}
            <div className="login-btn">
              <Login />
            </div>
            <div className="burger-btn">
              <Button
                variant="warning"
                onClick={() => dispatch({ type: SET_MENU, payload: true })}
              >
                ☰
              </Button>
            </div>
          </NavStyled>
        </nav>
        <SidebarMobile
          open={state.showMenu}
          close={() => dispatch({ type: SET_MENU, payload: false })}
        />
      </HeaderStyled>
    </HeaderWrapperStyled>
  );
};

const HeaderWrapperStyled = styled.header`
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 9;
  color: white;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.mainColor};
  a {
    text-decoration: none;
    color: white;
  }
  @media ${device.sm} {
    padding-inline: 1rem;
  }
`;

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1024px;
  margin: 0 auto;
  > div:nth-child(1) {
    display: flex;
    gap: 1rem;
    align-items: center;
    input {
      width: 100%;
      background: none;
      border: 1px solid white;
      outline: none;
      padding: 0.3rem 1rem;
      color: white;
      border-radius: 50px;
      font-size: 0.9rem;
    }
  }
  @media ${device.sm} {
    .logo {
      width: 60px;
    }
  }
`;

const NavStyled = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  .login-btn {
    @media ${device.sm} {
      display: none;
    }
  }
  .burger-btn {
    display: none;
    @media ${device.sm} {
      display: block;
    }
  }
`;

export const NavListStyled = styled.li<{ active: boolean }>`
  list-style: none;
  > a {
    color: ${(props) => (props.active ? "yellow" : "white")};
    &:hover {
      color: yellow;
    }
  }
  position: relative;

  @media ${device.sm} {
    display: none;
  }
`;

export default Header;
