import React, { useEffect, useState } from "react";
import axios from "axios";
import home from "../../public/images/home1.png";
import search from "../../public/images/search.png";
import notification from "../../public/images/notificatio.png";
import student from "../../public/images/student.png";
import user from "../../public/images/user.png";
import { Link } from "react-router-dom";
import "../styles/alllocationstyle.css";

const AllLocations = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    axios
      .get("https://tution-project-backend-iuym.vercel.app/get-all-locations")
      .then((response) => {
        console.log(response.data);
        setLocations(response.data.locations);
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
        <div className="content">
          <div className="content-2">
            <div className="recent-payments">
              <div className="title">
                <h2>All Location</h2>
              </div>
              <table>
                <tr>
                  <th>Location</th>
                  <th>Approve</th>
                  <th>Delete</th>
                </tr>
                {locations?.map((location) => {
                  const { location_name } = location;
                  return (
                    <>
                      <tr>
                        <td>{location_name}</td>
                        <td>
                          <Link to="#" className="btn">
                            Edit
                          </Link>
                        </td>
                        <td>
                          <Link to="#" className="btn">
                            Delete
                          </Link>
                        </td>
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

export default AllLocations;
