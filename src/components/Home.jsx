import { NavLink, useNavigate } from "react-router-dom";
import styles from "../css/home.module.css";
import Carouselitem from "./Carouselitem";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
const Home = () => {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  const role = useSelector((state) => state.userinfo.userinfo.role);

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin/get-all-pending-tutors");
    }
    axios
      .get(
        "https://tution-project-backend-iuym.vercel.app/tutors/recommended-tutors"
      )
      .then((res) => {
        setTutors(res?.data?.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const slider = useRef(null);
  const next = () => {
    let slider_width = slider.current.clientWidth;
    slider.current.scrollLeft = slider.current.scrollLeft + slider_width;
  };
  const prev = () => {
    let slider_width = slider.current.clientWidth;
    slider.current.scrollLeft = slider.current.scrollLeft - slider_width;
  };
  const url = "../../images/img.jpg";
  return (
    <div className={styles.home_container}>
      <div className={styles.hero}>
        <div className={styles.hero_text}>
          <p>
            Connecting Knowledge Seekers with Expert Mentors!..
            <br />
            <span>Transforming Lives through Quality Education</span>
          </p>
          <button type="button">
            <NavLink to="/signup">JOIN NOW</NavLink>
          </button>
        </div>
        <div className={styles.hero_img}>
          <img src="../../images/hero.svg" />
        </div>
      </div>
      <div className={styles.home_recommend}>
        <div className={styles.recommend_heading}>
          <h1>We Recommend You</h1>
        </div>
        <div className={styles.recommend_carousel}>
          <div className={styles.left_btn}>
            <button type="button" onClick={prev}>
              <img src="../../images/left-arrow.png" />
            </button>
          </div>
          <div className={styles.right_btn}>
            <button type="button" onClick={next}>
              <img src="../../images/right-arrow.png" />
            </button>
          </div>
          <div className={styles.carousel_body} ref={slider}>
            {/* <Carouselitem url={url} name={1} />
            <Carouselitem url={url} name={2} />
            <Carouselitem url={url} name={3} />
            <Carouselitem url={url} name={4} />
            <Carouselitem url={url} name={5} />
            <Carouselitem url={url} name={6} />
            <Carouselitem url={url} name={7} />
            <Carouselitem url={url} name={8} /> */}
            {tutors?.map((tutor) => (
              <Carouselitem url={url} tutor={tutor} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.home_about}>
        <div className={styles.about_heading}>
          <h1>FAQ</h1>
        </div>
        <div className={styles.about_details}>
          <div className={styles.question_info}>
            <div className={styles.question_answer}>
              <div className={styles.question_header}>
                <h1>For Gurdians or Students</h1>
              </div>
              <div>
                <ul>
                  <li>
                    <h1 className={styles.answer_header}>
                      Search For Tutors and Post For Job
                    </h1>
                    <p>
                      Search from our huge database of home tutors matching your
                      needs and if you need help, you can post your tuition
                      requirement here for free. One of our team member will get
                      in touch with you soon over the phone to discuss and
                      confirm your requirements.
                    </p>
                  </li>
                  <li>
                    <h1 className={styles.answer_header}>Hire Your Tutor</h1>
                    <p>
                      If you like the demo session, you continue with the same
                      teacher . In case, If you do not like the demo session, we
                      will arrange a new teacher for you.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.question_img}>
              <img src="../../images/rmhero.png" />
            </div>
          </div>
          <div className={styles.question_info}>
            <div className={styles.question_img}>
              <img src="../../images/gurdian.svg" />
            </div>
            <div className={styles.question_answer}>
              <div className={styles.question_header}>
                <h1>For Tutors</h1>
              </div>
              <div>
                <ul>
                  <li>
                    <h1 className={styles.answer_header}>
                      Create Tutor Profile
                    </h1>
                    <p>
                      Become a teacher by creating your profile here and tell us
                      about yourself, your skills, subject expertise,
                      qualifications, teaching ability and experience. Be sure
                      to provide as much information as you can in your profile
                      so that we can speed up the verification process and your
                      profile starts showing up in the right spot when parents
                      and students are searching for home tutors on our website.
                    </p>
                  </li>
                  <li>
                    <h1 className={styles.answer_header}>Apply for Jobs</h1>
                    <p>
                      Once your profile is complete, you can start browsing our
                      latest TUITION JOBS page and start applying for the
                      tuition jobs that best fits your skills, favorable
                      location, class and subjects.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.offer}>
        <p>So, Why you are waiting....</p>
        <button type="button">
          <NavLink to="">JOIN US</NavLink>
        </button>
      </div>
    </div>
  );
};

export default Home;
