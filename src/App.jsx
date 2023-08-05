import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Tutorprofile from "./components/Tutorprofile";
import Gurdianprofile from "./components/Gurdianprofile";
import Tutorfiltering from "./components/Tutorfiltering";
import Postfiltering from "./components/Postfiltering";
import Routers from "./routes/Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getInfo } from "./features/userQuery/userinfoSlice";
const App = () => {
  const dispatch = useDispatch();
  dispatch(getInfo());
  return (
    <>
      <Routers />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
