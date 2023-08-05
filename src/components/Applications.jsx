import Tuitionreq from "./Tuitionreq";
import styles from "../css/tutorprofile.module.css";
import tutor_dp from "../../public/images/img.jpg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { errorToast, successToast } from "./Toast";
import Application from "./Application";
const Applications = () => {
  const [requestedTution, setRequestedTution] = useState([]);
  const [guardian, setGuardian] = useState([]);
  const [flag, setFlag] = useState(false);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const guardian_id = userinfo?.id;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  useEffect(() => {
    axios
      .post(
        "https://tution-project-backend-iuym.vercel.app/guardians/guardian-profile",
        {
          guardian_id,
        }
      )
      .then((res) => {
        setGuardian(res?.data?.users[0]);
        return axios.get(
          "https://tution-project-backend-iuym.vercel.app/get-all-requested-tutions",
          {
            headers,
          }
        );
      })
      .then((res) => {
        setRequestedTution(res.data.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [flag]);

  const handleAssignedTution = async (tution_id, tutor_id, guardian_id) => {
    console.log(tution_id, tutor_id, guardian_id);
    const res = await axios
      .post(
        "https://tution-project-backend-iuym.vercel.app/assigned-tutor",
        { tution_id, tutor_id, guardian_id },
        { headers }
      )
      .then((res) => {
        if (res.data.message === "Tutor is assigned successfully") {
          successToast(res.data.message);
          setRequestedTution([]);
          setFlag(!flag);
        } else {
          errorToast(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.tutor_container}>
      <div className={styles.tutor_profile}>
        <form>
          <div className={styles.tutor_body}>
            <input type="text" name="name" value={guardian?.name || ""} />
            <input
              type="email"
              disabled
              name="email"
              value={guardian?.email || ""}
            />
            <input
              type="text"
              name="phone_number"
              value={guardian?.phone_number || ""}
            />
            <input type="text" name="address" value={guardian?.address || ""} />
          </div>
        </form>
      </div>
      <div className={styles.tuition_requests}>
        <h1>Applied Tuitions</h1>
        <div className={styles.tuition_request}>
          {requestedTution?.map((post) => (
            <Application post={post} assignedTution={handleAssignedTution} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;
