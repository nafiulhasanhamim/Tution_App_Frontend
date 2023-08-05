import { useEffect } from "react";
import styles from "../css/tutorfiltering.module.css";
import Carouselitem from "./Carouselitem";
import { useState } from "react";
import axios from "axios";
const Tutorfiltering = () => {
  const [tutors, setTutors] = useState([]);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  useEffect(() => {
    axios
      .get(
        "https://tution-project-backend-iuym.vercel.app/tutors/get-all-tutors"
      )
      .then((res) => {
        setTutors(res?.data?.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const url = "images/img.jpg";
  return (
    <div className={styles.filter_container}>
      <h1 className={styles.heading}>Hire Your Tutor</h1>
      <div className={styles.tutors}>
        {/* <Carouselitem url={url} name={1} />
        <Carouselitem url={url} name={2} />
        <Carouselitem url={url} name={3} />
        <Carouselitem url={url} name={4} />
        <Carouselitem url={url} name={5} />
        <Carouselitem url={url} name={6} /> */}
        {tutors?.map((tutor) => (
          <Carouselitem url={url} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default Tutorfiltering;
