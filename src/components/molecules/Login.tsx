/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import styled from "styled-components";
import { API_CALL } from "../../utils/api";
import Button from "../atoms/Button";
import { Dialog } from "../atoms/Dialog";

const Login = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [reqToken, setRekToken] = useState({
    expires_at: "",
    request_token: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [accountId, setAccountId] = useState("");
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "accountId",
  ]);

  const hasReqToken = reqToken?.request_token !== "";

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await API_CALL(`/3/authentication/token/new`);
      setRekToken(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (name: string, value: string) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await API_CALL.post(
        `/3/authentication/token/validate_with_login`,
        {
          ...loginForm,
          request_token: reqToken.request_token,
        }
      );

      if (res.status === 200) {
        const expires = new Date(reqToken?.expires_at);
        setCookies("token", res.data.request_token, {
          expires,
        });
        setCookies("accountId", accountId, {
          expires,
        });
        toast.success("Yup Good Job !", {
          position: "top-center",
          theme: "colored",
          autoClose: 800,
        });
        setLoading(false);
        setOpenLogin(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.status_message, {
        position: "top-center",
        theme: "colored",
      });
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("accountId");
    setRekToken({
      expires_at: "",
      request_token: "",
    });
    setLoginForm({
      username: "",
      password: "",
    });
    setAccountId("");
  };

  return (
    <>
      <Button
        variant="success"
        onClick={cookies.token ? handleLogout : () => setOpenLogin(true)}
      >
        {cookies.token ? "Logout" : "Login"}
      </Button>
      <Dialog
        open={openLogin}
        setOpen={setOpenLogin}
        title="Login TMDB Account"
      >
        {hasReqToken ? (
          <LoginFormStyled>
            <div>
              <label htmlFor="account_id">Account ID</label>
              <input
                type="text"
                id="account_id"
                placeholder="Account ID"
                onChange={(e) => setAccountId(e.target.value)}
              />
              <span className="hint">
                Login to your TMBD & Follow this{" "}
                <a
                  href="http://dev.travisbell.com/play/v3_account_details.html"
                  target="_blank"
                >
                  website
                </a>{" "}
                OR you can Access this{" "}
                <a
                  href="https://developer.themoviedb.org/reference/account-details"
                  target="_blank"
                >
                  API TMDB Account Details
                </a>{" "}
                to get your Account ID
              </span>
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
          </LoginFormStyled>
        ) : (
          <span>Press Generate Before Login</span>
        )}
        <Button
          variant={hasReqToken ? "success" : "warning"}
          onClick={hasReqToken ? handleLogin : handleGenerate}
          loading={loading}
        >
          {hasReqToken ? "Login" : "Generate"}
        </Button>

        {hasReqToken && (
          <InfoStyled>📢 Use your TMDB Account for login</InfoStyled>
        )}
      </Dialog>
    </>
  );
};

const LoginFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  input {
    padding: 0.2rem;
  }
  gap: 1rem;
  > div {
    display: flex;
    flex-direction: column;
    > label {
      font-size: 0.9rem;
      margin-bottom: 0.2rem;
    }
  }
  .hint {
    font-size: 0.6rem;
    margin-top: 0.2rem;
    a {
      color: yellow;
    }
  }
`;

const InfoStyled = styled.div`
  color: white;
  font-size: 0.7rem;
  text-align: center;
`;

export default Login;
