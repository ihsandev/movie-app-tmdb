import { ReactNode } from "react";
import styled from "styled-components";

interface IDialog {
  children: ReactNode;
  open: boolean;
  setOpen(open: boolean): void;
  title?: string;
}

export const Dialog = ({ children, open, setOpen, title }: IDialog) => {
  return (
    <DialogOverlay open={open}>
      <DialogStyled>
        <CloseDialog onClick={() => setOpen(false)}>❌</CloseDialog>
        {title && <DialogTitle>{title}</DialogTitle>}
        {children}
      </DialogStyled>
    </DialogOverlay>
  );
};

const DialogStyled = styled.div`
  width: 300px;
  height: fit-content;
  background-color: ${(props) => props.theme.mainColor};
  position: relative;
  z-index: 999;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CloseDialog = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -8px;
  right: -10px;
  cursor: pointer;
`;

const DialogTitle = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 1.3rem;
`;

const DialogOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  transition: all;
  transition-duration: 0.3s;
  opacity: ${(props) => (props.open ? 1 : 0)};
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
`;
