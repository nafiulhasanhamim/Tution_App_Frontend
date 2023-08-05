import { useEffect } from "react";
import styles from "../css/postfiltering.module.css";
import Gurdianpost from "./Gurdianpost";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Postfiltering = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [prevposts, setPrevPosts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredValue, setFilteredValue] = useState({
    location: "All",
    salary_range: "5k-10k",
    medium: "All",
    tution_preference: "All",
    tution_type: "All",
    page: 1,
  });

  const {
    location,
    salary_range,
    medium,
    tution_preference,
    tuition_type,
    page,
  } = filteredValue;
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  useEffect(() => {
    // axios
    //   .get("http://localhost:3001/find-tutions", { headers })
    //   .then((res) => {
    //     setPrevPosts(res?.data?.posts);
    //     return axios.get("http://localhost:3001/get-all-locations");
    //   })
    //   .then((res2) => {
    //     setLocations(res2.data.locations);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    axios
      .get("https://tution-project-backend-iuym.vercel.app/get-all-locations")
      .then((res2) => {
        setLocations(res2.data.locations);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        "https://tution-project-backend-iuym.vercel.app/filtering-tutions",
        filteredValue
      )
      .then((res) => {
        setPrevPosts(res?.data?.posts);
      });
  }, [filteredValue]);

  const handleFilterChange = (e) => {
    setFilteredValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePageChange = (e) => {
    if (e.target.name === "inc") {
      setFilteredValue((prev) => ({
        ...prev,
        page: page + 1,
      }));
    } else {
      setFilteredValue((prev) => ({
        ...prev,
        page: page - 1,
      }));
    }
  };

  return (
    <div className={styles.filter_container}>
      <div className={styles.filter_section}>
        <div className={styles.filter_options}>
          <div className={styles.filter_heading}>
            <h1>Filter Options</h1>
          </div>
          <div className={styles.tuition_type}>
            <div className={styles.heading_type}>
              <h1>Tution Type</h1>
            </div>
            <div className={styles.options_type}>
              <div>
                <input
                  type="radio"
                  name="tution_type"
                  value="All"
                  onChange={handleFilterChange}
                />{" "}
                <span>All</span>
              </div>
              <div>
                <input
                  type="radio"
                  name="tution_type"
                  value="Home Tution"
                  onChange={handleFilterChange}
                />{" "}
                <span>Home Tution</span>
              </div>
              <div>
                <input
                  type="radio"
                  name="tution_type"
                  value="Online Tution"
                  onChange={handleFilterChange}
                />{" "}
                <span>Online Tution</span>
              </div>
              <div>
                <input
                  type="radio"
                  name="tution_type"
                  value="Group Tution"
                  onChange={handleFilterChange}
                />{" "}
                <span>Group Tution</span>
              </div>
            </div>
          </div>
          <div className={styles.gender_preference}>
            <div className={styles.heading_type}>
              <h1>Tution Preference</h1>
            </div>
            <div className={styles.options_type}>
              <div>
                <input
                  type="radio"
                  name="tution_preference"
                  value="All"
                  onChange={handleFilterChange}
                />{" "}
                <span>All</span>
              </div>
              <div>
                <input
                  type="radio"
                  name="tution_preference"
                  value="Male"
                  onChange={handleFilterChange}
                />
                <span>Male</span>
              </div>
              <div>
                <input
                  type="radio"
                  name="tution_preference"
                  value="Female"
                  onChange={handleFilterChange}
                />
                <span>Female</span>
              </div>
            </div>
          </div>
          <div className={styles.location_preference}>
            <div className={styles.heading_type}>
              <h1>Search By Location</h1>
            </div>
            <div className={styles.search_option}>
              <select
                name="location"
                value={location}
                selected
                onChange={handleFilterChange}
              >
                <option value="All">All</option>
                {/* <option value="Noapara" selected>
                  Noapara
                </option> */}
                {locations?.map(({ location_id, location_name }) => {
                  return (
                    <>
                      <option value={location_name}>{location_name}</option>
                    </>
                  );
                })}
                <option value="Raozan" selected>
                  Raozan
                </option>
                {/* <option value="ranguniya">Ranguniya</option>
                <option value="shantirhat">Shantir Hat</option>
                <option value="tapbiddut">Tapbiddut</option>
                <option value="cuet dormitory">Cuet Dormitory</option>
                <option value="pahartoli">Pahartoli</option>
                <option value="gourishankar">Gourishankar</option>
                <option value="goshci">Goshci</option>
                <option value="noapara">Noapara</option>
                <option value="khuaish">Khuaish</option>
                <option value="rastarmatha">Rastar Matha</option>
                <option value="chandgaon">Chandgaon</option>
                <option value="bohoddarhat">Bohoddar Hat</option>
                <option value="shulukbohor">Shulokbohor</option>
                <option value="muradpu">Muradpur</option>
                <option value="sholosohor">Sholo Shohor</option>
                <option value="2nogate">2no Gate</option>
                <option value="oxygen">Oxygen</option>
                <option value="Gec">Gec</option>
                <option value="khulshi">Khulshi</option>
                <option value="dampara">Dampara</option>
                <option value="tigerpass">Tiger Pass</option>
                <option value="dewyanhat">Dewyan Hat</option>
                <option value="eidgah">Eid Gah</option>
                <option value="halishohor">Halishohor</option>
                <option value="agrabad">Agrabad</option>
                <option value="madarbari">Madarbari</option>
                <option value="newmarket">New Market</option>
                <option value="andorkilla">Andorkillah</option>
                <option value="didarmarket">Didar Market</option>
                <option value="chawkhbazar">Chawkhbazar</option> */}
              </select>
            </div>
          </div>
          <div className={styles.payment_preference}>
            <div className={styles.heading_type}>
              <h1>Search By Salary Range</h1>
            </div>
            <div className={styles.search_option}>
              <select
                name="salary_range"
                value={salary_range}
                onChange={handleFilterChange}
                selected
              >
                {/* <option value="all" selected>
                  All
                </option> */}
                <option value="5k-10k">5k-10k</option>
                <option value="10k-15k">10k-15k</option>
                <option value="15k-20k">15k-20k</option>
                <option value="20k-25k">20k-25k</option>
              </select>
            </div>
          </div>
          <div className={styles.medium_preference}>
            <div className={styles.heading_type}>
              <h1>Search By Academic Type</h1>
            </div>
            <div className={styles.search_option}>
              <select
                name="medium"
                value={medium}
                onChange={handleFilterChange}
              >
                <option value="All" selected>
                  All
                </option>
                <option value="Bangla">Bangla Medium</option>
                <option value="English">English Version</option>
                {/* <option value="englishm">English Medium</option>
                <option value="religious">Religious Studies</option>
                <option value="admission">Admission Test</option>
                <option value="skills">Professional skill Development</option>
                <option value="arts">Arts</option>
                <option value="specialskills">Special Skill Development</option>
                <option value="university">Univarsity Program</option>
                <option value="lang">Language Learning</option>
                <option value="examprep">Test Preparation</option>
                <option value="madrasa">Madrasa</option>
                <option value="Special">Special Child Education</option> */}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.filtered_posts}>
          <div className={styles.noofposts}>
            <div className={styles.showposts}>
              {/* <p>Shows 140 post out of 1400 </p> */}
              <p>Shows {prevposts?.length} posts</p>
            </div>
          </div>

          {/* <div className={styles.posts}>
          {prevposts?.map((prevpost) => (
            <Gurdianpost key={prevpost.tution_id} prevpost={prevpost} />
          ))}
          </div> */}
          {prevposts?.map((prevpost) => (
            <Gurdianpost key={prevpost.tution_id} prevpost={prevpost} />
          ))}
        </div>
      </div>
      <div className={styles.page_buttons}>
        {prevposts?.length > 0 && (
          <>
            {page === 1 ? (
              <button
                type="button"
                disabled
                name="inc"
                onClick={handlePageChange}
              >
                PREV
              </button>
            ) : (
              <button type="button" name="inc" onClick={handlePageChange}>
                PREV
              </button>
            )}

            {prevposts?.total_rows / 10 + (prevposts?.total_rows % 10) === 0 ? (
              0
            ) : 1 === page ? (
              <button
                type="button"
                disabled
                name="dec"
                onClick={handlePageChange}
              >
                NEXT
              </button>
            ) : (
              <button type="button" name="dec" onClick={handlePageChange}>
                NEXT
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Postfiltering;
