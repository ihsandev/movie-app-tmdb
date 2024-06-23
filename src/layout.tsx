import { Outlet } from "react-router-dom";
import Header from "./components/molecules/Header";
import Wrapper from "./components/atoms/Wrapper";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </main>
      <ToastContainer />
    </>
  );
};

export default Layout;
