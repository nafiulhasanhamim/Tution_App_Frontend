import axios from "axios";
import styles from "../css/gurdianpost.module.css";
import { errorToast, successToast } from "./Toast";
const Gurdianpost = ({ prevpost }) => {
  const {
    tution_id,
    location_name,
    tution_status,
    classname,
    salary,
    medium,
    available_status,
    email,
    name,
    number_of_days,
    phone_number,
    subject_name,
    total_rows,
    tution_preference,
    tution_type,
    user_id,
  } = prevpost;

  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const handleApply = async (tution_id, guardian_id) => {
    // console.log(tution_id, guardian_id, userinfo.id);
    const tutor_id = userinfo.id;
    const res = await axios
      .post(
        "https://tution-project-backend-iuym.vercel.app/apply-tution",
        { tution_id, guardian_id, tutor_id },
        { headers }
      )
      .then((res) => {
        if (res.data.message === "Applied successfully") {
          successToast(res.data.message);
        } else {
          errorToast(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.post}>
      <div className={styles.post_locid}>
        <div className={styles.post_loc}>
          <p>
            <img src="images/location.png" />{" "}
            <span>Location : {location_name}</span>
          </p>
        </div>
        <div className={styles.post_id}>
          <p>Available Status : {available_status}</p>
        </div>
      </div>
      <div className={styles.post_title}>
        <p>Tution Preference : {tution_preference}</p>
      </div>

      <div className={styles.post_typetime}>
        <p className={styles.post_type}>
          <img src="images/hometutor.png" /> <span>Home</span>
        </p>
        <p className={styles.post_time}>
          <img src="images/postago.png" />
          <span>Days : {number_of_days}</span>
        </p>
      </div>
      <div className={styles.post_details}>
        <p>
          <span>Medium : </span>
          <span>{medium}</span>
        </p>
        <p>
          <span>Class : </span>
          <span>{classname}</span>
        </p>
        <p>
          <span>Subjects : </span>
          <span>{subject_name}</span>
        </p>
      </div>
      <div className={styles.post_hire}>
        <p>
          <img src="images/salary.png" />
          Salary : &nbsp; {salary}
        </p>
        <p>
          <img src="images/salary.png" />
          Tution Type : &nbsp; {tution_type}
        </p>
        <p>
          <img src="images/salary.png" />
          Post Status : &nbsp; {tution_status}
        </p>
        {userinfo.role === "tutor" && (
          <button onClick={() => handleApply(tution_id, user_id)} type="button">
            <img src="images/hire.png" />
            Apply Tution
          </button>
        )}
      </div>
    </div>
  );
};

export default Gurdianpost;
