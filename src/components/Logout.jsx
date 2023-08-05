import React from "react";
import { errorToast, successToast } from "./Toast";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getInfo } from "../features/userQuery/userinfoSlice";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (userinfo === null) {
      navigate("/signin");
    } else {
      const token = userinfo?.token;
      axios
        .post("https://tution-project-backend-iuym.vercel.app/logout", {
          token,
        })
        .then((res) => {
          if (res?.data?.message === "Token has been deleted successfully") {
            successToast("User is logged out successfully");
          } else {
            errorToast(res.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      localStorage.removeItem("userinfo");
      dispatch(getInfo());
      navigate("/");
    }
  });
  return <></>;
};

export default Logout;
