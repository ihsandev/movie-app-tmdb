import { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  children: ReactNode;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  variant?: "primary" | "danger" | "warning" | "success";
  loading?: boolean;
}

const ButtonStyled = styled.button<ButtonProps>`
  background-color: ${({ variant, theme }) =>
    variant === "primary"
      ? theme?.mainColor
      : variant === "danger"
      ? "#a01e1e"
      : variant === "warning"
      ? "#d25e11"
      : variant === "success"
      ? "green"
      : theme?.mainColor};
  color: white;
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  opacity: ${({ loading }) => (loading ? 0.7 : 1)};
  &:hover {
    opacity: 0.9;
  }
  cursor: ${({ loading }) => (loading ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  .loading {
    margin-left: 0.5rem;
    margin-top: 5px;
  }
`;

const Button = ({ children, onClick, variant, loading }: ButtonProps) => (
  <ButtonStyled onClick={onClick} variant={variant} loading={loading}>
    <span>{children}</span>
    {loading ? (
      <span className="loading">
        <a href="https://emoji.gg/emoji/3339_loading" />
        <img
          src="https://cdn3.emoji.gg/emojis/3339_loading.gif"
          width="15px"
          height="15px"
          alt="loading"
        />
      </span>
    ) : null}
  </ButtonStyled>
);

export default Button;
