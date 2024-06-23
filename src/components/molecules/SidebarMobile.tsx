import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";

interface ISidebar {
  open: boolean | undefined;
  close?: () => void;
}

const SidebarMobile = ({ open, close }: ISidebar) => {
  const { pathname } = useLocation();
  return (
    <>
      <Overlay open={open} onClick={close}>
        <AsideStyle open={open}>
          <ListMenuStyled active={pathname === "/favorites"}>
            <Link to="/favorites">Favorite</Link>
          </ListMenuStyled>
          <ListMenuStyled active={pathname === "/watchlists"}>
            <Link to="/watchlists">WatchList</Link>
          </ListMenuStyled>
          <Login />
        </AsideStyle>
      </Overlay>
    </>
  );
};

const ListMenuStyled = styled.div<{ active: boolean }>`
  > a {
    color: ${(props) => (props.active ? "yellow" : "white")};
    &:hover {
      color: yellow;
    }
  }
`;

const Overlay = styled.div<{ open: boolean | undefined }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  transition: all;
  transition-duration: 0.3s;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
`;

const AsideStyle = styled.div<{ open: boolean | undefined }>`
  background-color: ${(props) => props.theme?.mainColor};
  height: 100%;
  width: 200px;
  position: relative;
  z-index: 9991;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  padding: 1rem;
  transition: all;
  transition-duration: 0.3s;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  margin-left: ${(props) => (props.open ? 0 : "-300px")};
`;

export default SidebarMobile;
