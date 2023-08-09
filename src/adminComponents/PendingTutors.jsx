import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import home from "../../public/images/home1.png";
import search from "../../public/images/search.png";
import notification from "../../public/images/notificatio.png";
import student from "../../public/images/student.png";
import user from "../../public/images/user.png";
import { Link } from "react-router-dom";
import "../styles/pendingtutor.css";
// import "../styles/styles.css";
const PendingTutors = () => {
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const [guardians, setGuardians] = useState([]);
  const [pendingTutors, setPendingTutors] = useState([]);

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
  useEffect(() => {
    axios
      .get(
        "https://tution-project-backend-iuym.vercel.app/admin/pending-tutors/get-all-pending-tutors",
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        setPendingTutors(response?.data?.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [toggle]);

  const handleApprove = (user_id) => {
    axios
      .put(
        "https://tution-project-backend-iuym.vercel.app/admin/pending-tutors/approve-user",
        {
          user_id,
        },
        {
          headers,
        }
      )
      .then((response) => {
        if (response?.data?.message === "Tutor Approved Successfully") {
          successMessage(response?.data?.message);
          setToggle(!toggle);
        } else {
          errorMessage(response?.data?.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (user_id) => {
    console.log(user_id);
    axios
      .put(
        "https://tution-project-backend-iuym.vercel.app/admin/pending-tutors/delete-tutor",
        { user_id },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response?.data);
        if (response?.data?.message === "Tutor is Deleted Successfully") {
          successMessage(response?.data?.message);
          setToggle(!toggle);
        } else {
          errorMessage(response?.data?.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
        <div class="content-2" style={{ margin: "100px" }}>
          <div class="recent-payments">
            <div class="title">
              <h1>Pending Tutor</h1>
            </div>
            <table>
              <tr>
                {/* <th>Image</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Approve</th>
                <th>Delete</th>
              </tr>

              {pendingTutors?.map((tutor) => {
                const { email, name, phone_number, user_id, id_card } = tutor;
                return (
                  <>
                    <tr>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{phone_number}</td>
                      <td>
                        {/* <a href="#" class="btn">
                          Add
                        </a> */}
                        <button
                          className="btn"
                          onClick={(e) => {
                            handleApprove(user_id);
                          }}
                        >
                          Add
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn"
                          onClick={(e) => {
                            handleDelete(user_id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    ;
                  </>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default PendingTutors;
