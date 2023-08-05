import { Link } from "react-router-dom";
import styles from "../css/carouselitem.module.css";
import Tutorprofile from "./Tutorprofile";
const Carouselitem = ({ tutor, url }) => {
  const { user_id, name, email, phone_number, id_card, profile_pic } = tutor;
  return (
    <div className={styles.carousel_item}>
      <div className={styles.item_head}>
        <img src={profile_pic} />
      </div>
      <div className={styles.item_body}>
        <div className={styles.item_name}>
          <h1>{name}</h1>
        </div>
        <div className={styles.item_name}>
          <p>{email}</p>
        </div>
        <div className={styles.item_name}>
          <p>{phone_number}</p>
        </div>

        <div className={styles.item_details}>
          {/* <input type="button" value="Hire" className={styles.item_btn} />
          <input type="button" value="Profile" className={styles.item_btn} /> */}
          <Link to="" className="btn btn-outline-dark m-3">
            Hire
          </Link>
          {/* <Link
            to="/tutorprofile"
            state={{ tutor }}
            className="btn btn-outline-dark m-3"
          >
            Profile
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Carouselitem;
