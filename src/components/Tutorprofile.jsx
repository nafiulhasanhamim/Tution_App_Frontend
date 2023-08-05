import Tuitionreq from "./Tuitionreq";
import styles from "../css/tutorprofile.module.css";
import tutor_dp from "../../public/images/img.jpg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { errorToast, successToast } from "./Toast";
const Tutorprofile = () => {
  const [appliedTution, setAppliedTution] = useState([]);
  const [tutor, setTutor] = useState({});
  const [flag, setFlag] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const tutor_id = userinfo?.id;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  useEffect(() => {
    axios
      .post(
        "https://tution-project-backend-iuym.vercel.app/tutors/tutor-profile",
        { tutor_id }
      )
      .then((res) => {
        setTutor(res?.data?.users[0]);
        return axios.get(
          "https://tution-project-backend-iuym.vercel.app/get-all-applied-tutions",
          {
            headers,
          }
        );
      })
      .then((res) => {
        setAppliedTution(res.data.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [flag]);

  const handleFileSelection = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (fileInputRef.current.value) {
      const formData = new FormData();
      formData.append("image", file);
      await axios
        .post(
          "https://api.imgbb.com/1/upload?key=2c48f4bcce671e360e4753aaec302c77",
          formData
        )
        .then((res1) => {
          const profile_pic_img = res1.data.data.url;
          const name = tutor.name;
          const address = tutor.address;
          const email = tutor.email;
          const user_id = tutor.user_id;
          const phone_number = tutor.phone_number;

          return axios.put(
            "https://tution-project-backend-iuym.vercel.app/tutors/updatedtutorprofile",
            {
              profile_pic_img,
              name,
              address,
              email,
              user_id,
              phone_number,
            },
            {
              headers,
            }
          );
        })
        .then((res1) => {
          console.log(res1.data);
          if (res1.data.message === "Information updated successfully") {
            // successToast("Profile Pic Updated Successfully...");
            setFlag(!flag);
          } else {
            errorToast(res1.data.message);
          }
        });

      fileInputRef.current.value = "";
      setSelectedImage(null);
    }
  };

  const handleClickPlusButton = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    setTutor((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (fileInputRef.current.value) {
    //   const formData = new FormData();
    //   formData.append("image", selectedImage);
    //   await axios
    //     .post(
    //       "https://api.imgbb.com/1/upload?key=2c48f4bcce671e360e4753aaec302c77",
    //       formData
    //     )
    //     .then((res1) => {
    //       const profile_pic_img = res1.data.data.url;
    //       const name = tutor.name;
    //       const address = tutor.address;
    //       const email = tutor.email;
    //       const user_id = tutor.user_id;
    //       const phone_number = tutor.phone_number;

    //       return axios.put(
    //         "http://localhost:3001/tutors/updatedtutorprofile",
    //         {
    //           profile_pic_img,
    //           name,
    //           address,
    //           email,
    //           user_id,
    //           phone_number,
    //         },
    //         {
    //           headers,
    //         }
    //       );
    //     })
    //     .then((res1) => {
    //       console.log(res1.data);
    //       if (res1.data.message === "Information updated successfully") {
    //         successToast(res1.data.message);
    //         setFlag(!flag);
    //       } else {
    //         errorToast(res1.data.message);
    //       }
    //     });

    //   fileInputRef.current.value = "";
    //   setSelectedImage(null);
    // } else {
    const profile_pic_img = tutor.profile_pic;
    const name = tutor.name;
    const address = tutor.address;
    const email = tutor.email;
    const user_id = tutor.user_id;
    const phone_number = tutor.phone_number;
    await axios
      .put(
        "https://tution-project-backend-iuym.vercel.app/tutors/updatedtutorprofile",
        {
          profile_pic_img,
          name,
          address,
          email,
          user_id,
          phone_number,
        },
        {
          headers,
        }
      )
      .then((res1) => {
        console.log(res1.data.message);
        if (res1.data.message === "Information updated successfully") {
          successToast(res1.data.message);
          setFlag(!flag);
        } else {
          errorToast(res1.data.message);
        }
      });
    //}
  };
  return (
    <div className={styles.tutor_container}>
      <div className={styles.tutor_profile}>
        <form onSubmit={handleSubmit}>
          <div className={styles.tutor_head}>
            <img src={tutor?.profile_pic || tutor_dp} />

            <button type="button" onClick={handleClickPlusButton}>
              +
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelection}
            />
          </div>
          <div className={styles.tutor_body}>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={tutor?.name || ""}
            />
            <input
              type="email"
              disabled
              name="email"
              onChange={handleChange}
              value={tutor?.email || ""}
            />
            <input
              type="text"
              name="phone_number"
              onChange={handleChange}
              value={tutor?.phone_number || ""}
            />
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={tutor?.address || ""}
            />
            <div className={styles.tutor_control}>
              <button type="submit">Save</button>
              {/* <button type="button">Edit</button> */}
            </div>
          </div>
        </form>
      </div>

      <div className={styles.tuition_requests}>
        <h1>Applied Tuitions</h1>
        <div className={styles.tuition_request}>
          {appliedTution?.map((post) => (
            <Tuitionreq post={post} />
          ))}
          {/* </div> */}
          {/* {appliedTution?.map((post) => (
          <div className={styles.tuition_request}>
            <Tuitionreq post={post} />
          </div>
        ))} */}
        </div>
      </div>
    </div>
  );
};

export default Tutorprofile;
