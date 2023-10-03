import { NavLink, useNavigate } from "react-router-dom";
import styles from "../css/signin.module.css";
import { useEffect, useState } from "react";
import { errorToast, successToast } from "./Toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getInfo } from "../features/userQuery/userinfoSlice";
import { getRoleInfo } from "../features/userQuery/roleSlice";
const Signin = () => {
  useEffect(() => {
    const platform = navigator.platform.toUpperCase();
    console.log(platform);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    role: "tutor",
  });
  const { email, password, role } = loginInfo;
  const handleChange = (e) => {
    setLoginInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("https://tution-project-backend-iuym.vercel.app/login", loginInfo)
        .then((res) => {
          setLoginInfo({
            email: "",
            password: "",
            role: "",
          });
          if (res?.data?.message === "User is logged in successfully") {
            const userinfo = {
              id: res.data.userinfo.user_id,
              name: res.data.userinfo.name,
              token: res.data.token,
              role: res.data.userinfo.role,
            };
            const string = JSON.stringify(userinfo);
            localStorage.setItem("userinfo", string);
            dispatch(getInfo());
            dispatch(getRoleInfo());
            successToast(res.data.message);
            if (res.data.userinfo.role === "tutor") {
              navigate("/tutorprofile");
            } else if (res.data.userinfo.role === "guardian") {
              navigate("/");
            } else if (res.data.userinfo.role === "admin") {
              navigate("/admin/get-all-pending-tutors");
            }
          } else {
            errorToast(res.data.message);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.signin_container}>
      <form onSubmit={handleSubmit} className={styles.signin_body}>
        <h1>SIGN IN</h1>
        <p>Select Your Role : </p>
        <div className={styles.role}>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              value="tutor"
              checked={role === "tutor"}
              name="role"
            />{" "}
            <span>Tutor</span>
          </div>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              value="guardian"
              checked={role === "guardian"}
              name="role"
            />{" "}
            <span>Gurdian/Student</span>
          </div>
          <div>
            <input
              onChange={handleChange}
              type="radio"
              value="admin"
              checked={role === "admin"}
              name="role"
            />{" "}
            <span>Admin</span>
          </div>
        </div>
        <input
          type="text"
          onChange={handleChange}
          className={styles.sign_inp}
          autoComplete="off"
          name="email"
          value={email}
          required
          placeholder="enter your email"
        />
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={handleChange}
          className={styles.sign_inp}
          autoComplete="off"
          placeholder="enter your password"
        />
        <span className={styles.forget_pass}>
          <NavLink to="/">Forget Password?</NavLink>
        </span>
        <button type="submit">SIGN IN</button>

        <span className={styles.signup_nav}>
          Haven't You Join Us?{" "}
          <NavLink to="/Signup">
            <span>Sign Up</span> Here
          </NavLink>
        </span>
      </form>
    </div>
  );
};

export default Signin;
