import axios from "axios";
import styles from "../css/tutorprofile.module.css";
import React, { useEffect, useState } from "react";
import AssignedTution from "./AssignedTution";

const AssignedTutions = () => {
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const guardian_id = userinfo?.id;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const [assignedTution, setAssignedTution] = useState([]);
  const [guardian, setGuardian] = useState([]);
  useEffect(() => {
    axios
      .post(
        "https://tution-project-backend-iuym.vercel.app/guardians/guardian-profile",
        { guardian_id }
      )
      .then((res) => {
        setGuardian(res?.data?.users[0]);
        return axios.get(
          "https://tution-project-backend-iuym.vercel.app/get-all-assigned-tutions",
          {
            headers,
          }
        );
      })
      .then((res) => {
        setAssignedTution(res.data.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
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
              <input
                type="text"
                name="address"
                value={guardian?.address || ""}
              />
            </div>
          </form>
        </div>
        <div className={styles.tuition_requests}>
          <h1>Applied Tuitions</h1>
          <div className={styles.tuition_request}>
            {assignedTution?.map((post) => (
              <AssignedTution post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignedTutions;
