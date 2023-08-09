import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import home from "../../public/images/home1.png";
import search from "../../public/images/search.png";
import notification from "../../public/images/notificatio.png";
import student from "../../public/images/student.png";
import user from "../../public/images/user.png";
import { Link } from "react-router-dom";
import "../styles/addlocationstyle.css";

const AddLocation = () => {
  const successMessage = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const errorMessage = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const [location_name, setLocation] = useState("");
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "https://tution-project-backend-iuym.vercel.app/add-location",
          { location_name },
          {
            headers,
          }
        )
        .then((res) => {
          setLocation("");
          if (res?.data?.message === "Location has successfully been added") {
            successMessage(res.data.message);
          } else {
            errorMessage(res.data.message);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="side-menu">
        <div className="brand-name">
          <h1 style={{ color: "black" }}>TutionEe</h1>
        </div>
        <ul>
          <li className="AA">
            <img src={home} />
            &nbsp;{" "}
            <Link to="/admin/get-all-pending-tutors">All-Pending Tutors</Link>
          </li>
          {/* <li className="AA">
            <img src={home} />
            &nbsp;{" "}
            <Link to="/admin/get-all-approved-tutors">All-Approved Tutors</Link>
          </li> */}
          {/* <li className="AA">
            <img src={home} />
            &nbsp; <Link to="/admin/get-all-guardians">All-Guardian</Link>
          </li> */}
          {/* <li className="AA">
            <img src={home} />
            &nbsp;{" "}
            <Link to="/admin/get-all-approved-tutions">
              All Approved Tutions
            </Link>
          </li> */}
          <li className="AA">
            <img src={home} />
            &nbsp;
            <Link to="/admin/get-all-pending-tutions">Pending Tutions</Link>
          </li>
          <li className="AA">
            <img src={home} />
            &nbsp; <Link to="/admin/add-location">Add Location</Link>
          </li>
          <li className="AA">
            <img src={home} />
            &nbsp; <Link to="/admin/add-subject">Add Subject</Link>
          </li>
          {/* <li className="AA">
            <img src={home} />
            &nbsp;<Link to="/admin/get-all-locations">All-Location</Link>
          </li> */}
          <li className="AA">
            <img src={home} />
            &nbsp;
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="content">
          <div className="cards">
            <div className="card">
              <div className="box">
                <form onSubmit={handleSubmit}>
                  <input
                    required
                    onChange={(e) => setLocation(e.target.value)}
                    value={location_name}
                    type="text"
                    placeholder="Enter location.."
                  />
                  <button type="submit" className="ww">
                    Add-location
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLocation;
