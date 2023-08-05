import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "../css/nav.module.css";
import { useSelector } from "react-redux";
const Header = () => {
  const userinfo = useSelector((state) => state.userinfo.userinfo);
  const role = useSelector((state) => state.userinfo.userinfo.role);
  const url = "images/logo.png";
  const pageUrl = "/tutorfiltering";
  const pageName = "Find Tutor";
  const [isOpen, setIsopen] = useState(false);
  const open = isOpen ? styles.open : "";
  const leftX = isOpen ? styles.leftX : "";
  const rightX = isOpen ? styles.rightX : "";
  const gone = isOpen ? styles.gone : "";
  return (
    <nav className={styles.nav_bar}>
      <div className={styles.nav_logo}>
        <img
          src={url}
          alt="Platform Logo CUET TUITIONEE"
          className={styles.logo}
        />
      </div>
      <div
        className={styles.menu}
        onClick={() => {
          setIsopen(!isOpen);
        }}
      >
        <span className={leftX}></span>
        <span className={gone}></span>
        <span className={rightX}></span>
      </div>
      <ul className={`${styles.nav_link_list} ${open}`}>
        <li>
          <NavLink to="/" className={styles.nav_link_item}>
            Home
          </NavLink>
        </li>
        <li>
          {role === "guardian" ? (
            <NavLink to="/tutorfiltering" className={styles.nav_link_item}>
              Find Tutor
            </NavLink>
          ) : role === "tutor" ? (
            <NavLink to="/postfiltering" className={styles.nav_link_item}>
              Find Tution
            </NavLink>
          ) : (
            <NavLink to="/guidelines" className={styles.nav_link_item}>
              Guidelines
            </NavLink>
          )}
        </li>
        <li>
          {role === "guardian" && (
            <NavLink to="/applications" className={styles.nav_link_item}>
              Applications
            </NavLink>
          )}
        </li>
        <li>
          {role === "guardian" && (
            <NavLink
              to="/all-assigned-tutions"
              className={styles.nav_link_item}
            >
              Assigned
            </NavLink>
          )}
        </li>
        <li>
          {role === "guardian" ? (
            <NavLink to="/guardianprofile" className={styles.nav_link_item}>
              Profile
            </NavLink>
          ) : role === "tutor" ? (
            <NavLink to="/tutorprofile" className={styles.nav_link_item}>
              Profile
            </NavLink>
          ) : role === "admin" ? (
            <NavLink to="/admin/adminprofile" className={styles.nav_link_item}>
              Profile
            </NavLink>
          ) : (
            <NavLink to="/signin" className={styles.nav_link_item}>
              Profile
            </NavLink>
          )}
        </li>

        <li>
          <NavLink to="/about" className={styles.nav_link_item}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={styles.nav_link_item}>
            Contact Us
          </NavLink>
        </li>
        {userinfo?.token?.length > 0 ? (
          <li>
            <NavLink
              to="/logout"
              className={`${styles.nav_btn} ${styles.nav_link_item}`}
            >
              LOG OUT
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink
              to="/signin"
              className={`${styles.nav_btn} ${styles.nav_link_item}`}
            >
              SIGN IN
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
