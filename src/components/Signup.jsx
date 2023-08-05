import { useRef, useState } from "react";
import styles from "../css/signup.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "./Toast";
import axios from "axios";
const Signup = () => {
  const [isshow, setIsshow] = useState(false);
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone_number: "",
    profile_pic: "",
    id_card: "",
    password: "",
    role: "",
    retype_password: "",
  });

  const fileInputRef1 = useRef();
  const fileInputRef2 = useRef();

  const {
    name,
    email,
    address,
    password,
    retype_password,
    phone_number,
    profile_pic,
    role,
    id_card,
  } = formInfo;

  const [images, setImages] = useState({
    profileImage: null,
    idImage: null,
  });

  const isSecurePassword = (password) => {
    // Define a regular expression pattern for password validation
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    // Test the password against the regular expression
    return regex.test(password);
  };

  const handleFormSubmit = async (e) => {
    let profile_pic_img, id_card_img;
    e.preventDefault();
    if (password !== retype_password) {
      errorToast("Password is Mismatched");
    } else {
      const isSecurePass = isSecurePassword(password);
      if (isSecurePass) {
        if (isshow) {
          const formData = new FormData();
          formData.append("image", images.profileImage);
          await axios
            .post(
              "https://api.imgbb.com/1/upload?key=2c48f4bcce671e360e4753aaec302c77",
              formData
            )
            .then((res1) => {
              profile_pic_img = res1.data.data.url;

              const formData1 = new FormData();
              formData1.append("image", images.idImage);
              return axios.post(
                "https://api.imgbb.com/1/upload?key=2c48f4bcce671e360e4753aaec302c77",
                formData1
              );
            })
            .then((res2) => {
              id_card_img = res2.data.data.url;
              const role = "tutor";
              console.log(formInfo);
              return axios.post(
                "https://tution-project-backend-iuym.vercel.app/register",
                {
                  address,
                  email,
                  id_card_img,
                  name,
                  password,
                  phone_number,
                  profile_pic_img,
                  role,
                }
              );
            })
            .then((res3) => {
              console.log(res3.data.message);
              if (res3.data.message === "User is created Successfully") {
                successToast(res3.data.message);
                navigate("/signin");
              } else {
                errorToast(res3.data.message);
              }
            });
        } else {
          const profile = images.profileImage;
          const formData3 = new FormData();
          formData3.append("image", profile);
          await axios
            .post(
              "https://api.imgbb.com/1/upload?key=2c48f4bcce671e360e4753aaec302c77",
              formData3
            )
            .then((res1) => {
              profile_pic_img = res1.data.data.url;
              const role = "guardian";
              return axios.post(
                "https://tution-project-backend-iuym.vercel.app/register",
                {
                  address,
                  email,
                  name,
                  password,
                  phone_number,
                  profile_pic_img,
                  role,
                }
              );
            })
            .then((res2) => {
              console.log(res2.data.message);
              if (res2.data.message === "User is created Successfully") {
                successToast(res2.data.message);
                navigate("/signin");
              } else {
                errorToast(res2.data.message);
              }
            });
        }
      } else {
        errorToast(
          "Password consists of atleast 6 characters, at least one number and one letter..."
        );
      }
    }

    setFormInfo({
      name: "",
      email: "",
      address: "",
      phone_number: "",
      profile_pic: "",
      id_card: "",
      password: "",
      retype_password: "",
    });
    setImages({
      profileImage: null,
      idImage: null,
    });

    if (fileInputRef1.current) {
      fileInputRef1.current.value = "";
    }
    if (fileInputRef2.current) {
      fileInputRef2.current.value = "";
    }
  };

  const handleChange = (e) => {
    setFormInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImages((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  return (
    <div className={styles.signup_container}>
      <h1>SIGN UP</h1>
      <form
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
        className={styles.signup_body}
      >
        <div className={styles.signup_info}>
          <div className={styles.signup_left}>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={handleChange}
              className={styles.signup_inp}
              placeholder="enter your full name"
            />
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={handleChange}
              className={styles.signup_inp}
              placeholder="enter your email"
            />
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={handleChange}
              className={styles.signup_inp}
              placeholder="enter your password"
            />
            <input
              type="password"
              name="retype_password"
              required
              value={retype_password}
              onChange={handleChange}
              className={styles.signup_inp}
              placeholder="retype your password"
            />
            <input
              type="text"
              name="address"
              required
              value={address}
              onChange={handleChange}
              className={styles.signup_inp}
              placeholder="enter your address"
            />
            <input
              type="text"
              name="phone_number"
              required
              value={phone_number}
              onChange={handleChange}
              className={styles.signup_inp}
              placeholder="enter your phone number"
            />
          </div>
          <div className={styles.signup_right}>
            <div>
              <p>Select Your Profile Picture : </p>
              <input
                name="profileImage"
                required
                className={styles.signup_inp}
                onChange={handleImageChange}
                type="file"
                ref={fileInputRef1}
              />
            </div>
            <p>Select Your Role : </p>
            <div className={styles.labels_design}>
              <div>
                <input
                  type="radio"
                  value="tutor"
                  checked={isshow}
                  onClick={() => {
                    setIsshow(true);
                    setFormInfo({
                      name: "",
                      email: "",
                      address: "",
                      phone_number: "",
                      profile_pic: "",
                      id_card: "",
                      password: "",
                      retype_password: "",
                    });
                    setImages({
                      profileImage: null,
                      idImage: null,
                    });

                    if (fileInputRef1.current) {
                      fileInputRef1.current.value = "";
                    }
                    if (fileInputRef2.current) {
                      fileInputRef2.current.value = "";
                    }
                  }}
                  name="role"
                />{" "}
                <span>Tutor</span>
              </div>
              <div>
                <input
                  type="radio"
                  value="gs"
                  checked={!isshow}
                  onClick={() => {
                    setIsshow(false);
                    setFormInfo({
                      name: "",
                      email: "",
                      address: "",
                      phone_number: "",
                      profile_pic: "",
                      id_card: "",
                      password: "",
                      retype_password: "",
                    });
                    setImages({
                      profileImage: null,
                      idImage: null,
                    });

                    if (fileInputRef1.current) {
                      fileInputRef1.current.value = "";
                    }
                    if (fileInputRef2.current) {
                      fileInputRef2.current.value = "";
                    }
                  }}
                  name="role"
                />{" "}
                <span>Gurdian/Student</span>
              </div>
            </div>
            {isshow && (
              <div>
                <p>Select Your Student Id Card Image (front sides): </p>
                <input
                  required
                  name="idImage"
                  onChange={handleImageChange}
                  className={styles.signup_inp}
                  type="file"
                  ref={fileInputRef2}
                />
                {/* <input className={styles.signup_inp} type="file"/> */}
              </div>
            )}
          </div>
        </div>
        <button type="submit">SIGN UP</button>
        <p>
          Already Join Us?{" "}
          <span>
            <NavLink to="/signin">Sign In</NavLink>
          </span>{" "}
          Here
        </p>
      </form>
    </div>
  );
};

export default Signup;
