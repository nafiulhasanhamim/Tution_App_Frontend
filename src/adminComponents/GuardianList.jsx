import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import home from "../../public/images/home1.png";
import search from "../../public/images/search.png";
import notification from "../../public/images/notificatio.png";
import student from "../../public/images/student.png";
import user from "../../public/images/user.png";
import { Link } from "react-router-dom";
import "../styles/guardianstyle.css";
const GuardianList = () => {
  const [guardians, setGuardians] = useState([]);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  useEffect(() => {
    axios
      .get(
        "https://tution-project-backend-iuym.vercel.app/admin/guardians/get-all-guardians",
        {
          headers,
        }
      )
      .then((response) => {
        setGuardians(response?.data?.users);
        console.log(response.data.users);
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
          <li className="AA">
            <img src={home} />
            &nbsp;{" "}
            <Link to="/admin/get-all-approved-tutors">All-Approved Tutors</Link>
          </li>
          <li className="AA">
            <img src={home} />
            &nbsp; <Link to="/admin/get-all-guardians">All-Guardian</Link>
          </li>
          <li className="AA">
            <img src={home} />
            &nbsp;{" "}
            <Link to="/admin/get-all-approved-tutions">
              All Approved Tutions
            </Link>
          </li>
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
            &nbsp;<Link to="/admin/get-all-locations">All-Location</Link>
          </li>
          <li className="AA">
            <img src={home} />
            &nbsp;
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="header">
          <div className="nav">
            <div className="search">
              <input type="text" placeholder="search.." />
              <button type="submit">
                <img src={search} />
              </button>
            </div>
            <div className="user">
              <a href="#" className="btn">
                Add new
              </a>
              <img src={notification} />
              <div className="img-case">
                <img src={user} />
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="content-2">
            <div className="recent-payments">
              <div className="title">
                <h2>Gardian List</h2>
                <a href="#" className="btn">
                  Viwe All
                </a>
              </div>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
                {guardians?.map((guardian) => {
                  const { user_id, name, email, phone_number } = guardian;
                  return (
                    <>
                      <tr>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone_number}</td>
                      </tr>
                    </>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuardianList;
