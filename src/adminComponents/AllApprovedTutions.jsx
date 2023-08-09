import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import home from "../../public/images/home1.png";
import search from "../../public/images/search.png";
import notification from "../../public/images/notificatio.png";
import student from "../../public/images/student.png";
import user from "../../public/images/user.png";
import { Link } from "react-router-dom";
import "../styles/approvedtutionsstyle.css";
const AllApprovedTutions = () => {
  const [guardians, setGuardians] = useState([]);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

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

  const [toggle, setToggle] = useState(true);
  const [tutions, setTutions] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://tution-project-backend-iuym.vercel.app/get-all-approved-tutions",
        { headers }
      )
      .then((response) => {
        // console.log(response?.data?.posts);
        setTutions(response?.data?.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        <div class="content">
          <div class="cards">
            {tutions?.map((tution) => {
              const {
                available_status,
                classname,
                email,
                location_name,
                medium,
                name,
                number_of_days,
                salary,
                phone_number,
                subject_name,
                total_rows,
                tution_id,
                tution_preference,
                tution_status,
                tution_type,
                user_id,
              } = tution;
              return (
                <>
                  <div class="card">
                    <div class="box">
                      <h1>
                        Posted By : <span class="mm">{name}</span>
                      </h1>
                      <h1>
                        Location : <span class="mm">{location_name}</span>
                      </h1>
                      <h1>
                        Email : <span class="mm">{email}</span>
                      </h1>
                      <h1>
                        Phone : <span class="mm">{phone_number}</span>
                      </h1>
                      <h1>
                        Class : <span class="mm">{classname}</span>
                      </h1>
                      <h1>
                        Salary : <span class="mm">{salary}</span>
                      </h1>
                      <h1>
                        Medium : <span class="mm">{medium}</span>
                      </h1>
                      <h1>
                        Number Of Days :{" "}
                        <span class="mm">{number_of_days}</span>
                      </h1>
                      <h1>
                        Subjects : <span class="mm">{subject_name}</span>
                      </h1>
                      <h1>
                        Available Status :{" "}
                        <span class="mm">{available_status}</span>
                      </h1>
                      <h1>
                        Tution Preference :{" "}
                        <span class="mm">{tution_preference}</span>
                      </h1>
                      <h1>
                        Tution Type : <span class="mm">{tution_type}</span>
                      </h1>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllApprovedTutions;
