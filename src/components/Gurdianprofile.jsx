import { useEffect } from "react";
import styles from "../css/gurdianprofile.module.css";
import guardian_dp from "../../public/images/img.jpg";
import Gurdianpost from "./Gurdianpost";
import { useGetTokenVerificationQuery } from "../features/userQuery/tokenVerificationQuery";
import { useDispatch } from "react-redux";
import { getInfo } from "../features/userQuery/userinfoSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { errorToast, successToast } from "./Toast";
const Gurdianprofile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  dispatch(getInfo());
  const { data, isLoading } = useGetTokenVerificationQuery(token);
  const [guardian, setGuardian] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [prevposts, setPrevPosts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [flag, setFlag] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const guardian_id = userinfo?.id;

  useEffect(() => {
    if (data?.result === "please provide valid token") {
      navigate("/signin");
    }
    axios
      .post(
        "https://tution-project-backend-iuym.vercel.app/guardians/guardian-profile",
        { guardian_id }
      )
      .then((res) => {
        setGuardian(res?.data?.users[0]);
        return axios.get(
          "https://tution-project-backend-iuym.vercel.app/get-all-subjects"
        );
      })
      .then((res1) => {
        setSubjects(res1?.data?.subjects);
        return axios.get(
          "https://tution-project-backend-iuym.vercel.app/guardian/get-all-posts-by-a-particular-guardian",
          { headers }
        );
      })
      .then((res2) => {
        setPrevPosts(res2?.data?.posts);
        return axios.get(
          "https://tution-project-backend-iuym.vercel.app/get-all-locations"
        );
      })
      .then((res3) => {
        setLocations(res3.data.locations);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [flag]);

  const handleFileSelection = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (fileInputRef.current.value) {
      const formData = new FormData();
      formData.append("image", file);
      await axios
        .post(
          "https://api.imgbb.com/1/upload?key=2c48f4bcce671e360e4753aaec302c77",
          formData
        )
        .then((res1) => {
          const profile_pic_img = res1.data.data.url;
          const name = guardian.name;
          const address = guardian.address;
          const email = guardian.email;
          const user_id = guardian.user_id;
          const phone_number = guardian.phone_number;

          return axios.put(
            "https://tution-project-backend-iuym.vercel.app/guardians/updatedguardianprofile",
            {
              profile_pic_img,
              name,
              address,
              email,
              user_id,
              phone_number,
            },
            {
              headers,
            }
          );
        })
        .then((res1) => {
          if (res1.data.message === "Information updated successfully") {
            // successToast("Profile Pic Updated Successfully...");
            setFlag(!flag);
          } else {
            errorToast(res1.data.message);
          }
        });

      fileInputRef.current.value = "";
      setSelectedImage(null);
    }
  };

  const handleClickPlusButton = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    setGuardian((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile_pic_img = guardian.profile_pic;
    const name = guardian.name;
    const address = guardian.address;
    const email = guardian.email;
    const user_id = guardian.user_id;
    const phone_number = guardian.phone_number;
    await axios
      .put(
        "https://tution-project-backend-iuym.vercel.app/guardians/updatedguardianprofile",
        {
          profile_pic_img,
          name,
          address,
          email,
          user_id,
          phone_number,
        },
        {
          headers,
        }
      )
      .then((res1) => {
        console.log(res1.data.message);
        if (res1.data.message === "Information updated successfully") {
          successToast(res1.data.message);
          setFlag(!flag);
        } else {
          errorToast(res1.data.message);
        }
      });
    //}
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const [tution_type, setTutionType] = useState("Home");
  const [location, setLocation] = useState(locations[0]?.location_name || "");
  const [medium, setMedium] = useState("Bangla");
  const [tution_preference, setPreference] = useState("All");
  const [formInput, setFormInput] = useState({
    salary: "",
    number_of_days: "",
    classes: "",
  });

  const { salary, number_of_days, classes } = formInput;

  const handleCheckBoxChange = (event, subject_id) => {
    const value = subject_id;

    if (event.target.checked) {
      // If checkbox is checked, add the value to the selectedItems state
      setSelectedItems((prevSelected) => [...prevSelected, value]);
    } else {
      // If checkbox is unchecked, remove the value from the selectedItems state
      setSelectedItems((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );
    }
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setTutionType(value);
  };

  const handleMediumChange = (event) => {
    const value = event.target.value;
    setMedium(value);
  };

  const handlePreferenceChange = (event) => {
    const value = event.target.value;
    setPreference(value);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  const handlePostForm = (e) => {
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      errorToast("Please Choose subject");
    } else {
      const loc = location.length === 0 ? locations[0].location_name : location;

      const body = {
        location: loc,
        salary: parseInt(salary),
        number_of_days: parseInt(number_of_days),
        medium,
        classes,
        tution_preference,
        tution_type,
        subjects: selectedItems,
      };
      const post = await axios
        .post(
          "https://tution-project-backend-iuym.vercel.app/guardian/post-tution",
          body,
          {
            headers,
          }
        )
        .then((res) => {
          if (res.data.message === "Tution is posted Successfully") {
            successToast(res.data.message);
            setSelectedItems([]);
            setTutionType("Home");
            setLocation(locations[0]?.location_name || "");
            setMedium("Bangla");
            setPreference("All");
            setFormInput({
              salary: "",
              number_of_days: "",
              classes: "",
            });
            setFlag(!flag);
          } else {
            errorToast(res.data.message);
          }
        })
        .catch((error) => {
          errorToast("Something Went Wrong");
          console.error(error);
        });
    }
  };

  return (
    <div className={styles.gurdian_container}>
      <div className={styles.gurdian_profile}>
        <form onSubmit={handleSubmit}>
          <div className={styles.gurdian_head}>
            <img src={guardian?.profile_pic || guardian_dp} />

            <button type="button" onClick={handleClickPlusButton}>
              +
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelection}
            />
          </div>
          <div className={styles.gurdian_body}>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={guardian?.name || ""}
            />
            <input
              type="email"
              disabled
              name="email"
              onChange={handleChange}
              value={guardian?.email || ""}
            />
            <input
              type="text"
              name="phone_number"
              onChange={handleChange}
              value={guardian?.phone_number || ""}
            />
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={guardian?.address || ""}
            />
            <div className={styles.gurdian_control}>
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>

      <div className={styles.gurdian_post}>
        <h1>Add Post</h1>
        <form onSubmit={handleSubmitPost} className={styles.post_info}>
          <div className={styles.tuition_type}>
            <label>Tuition Type</label>
            <select
              id="tuiton_type"
              required
              selected
              value={tution_type}
              onChange={handleSelectChange}
            >
              <option value="Home Tution" selected>
                Home
              </option>
              <option value="Online Tution">Online</option>
              <option value="Group Tution">Group</option>
            </select>
          </div>

          <div className={styles.tuition_class}>
            <label>Class</label>
            <input
              type="text"
              name="classes"
              required
              value={classes}
              onChange={handlePostForm}
              placeholder="enter class like 9,10,hsc"
            />
          </div>
          <div className={styles.tuition_type}>
            <label>Location</label>
            <select
              id="location"
              required
              value={location}
              onChange={handleLocationChange}
            >
              {locations?.map(({ location_id, location_name }) => {
                return (
                  <>
                    <option value={location_name}>{location_name}</option>
                  </>
                );
              })}
            </select>
          </div>
          <div className={styles.tuition_subjects}>
            <label>Subjects</label>
            <div>
              {subjects?.map(({ subject_id, subject_name }) => {
                return (
                  <>
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(subject_id)}
                        onChange={(e) => handleCheckBoxChange(e, subject_id)}
                      />
                      <p>{subject_name}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className={styles.tuition_salary}>
            <label>Salary</label>
            <input
              type="text"
              required
              name="salary"
              value={salary}
              onChange={handlePostForm}
              placeholder="enter the salary you wanna pay"
            />
          </div>
          <div className={styles.tuition_salary}>
            <label>Number of days</label>
            <input
              type="text"
              required
              name="number_of_days"
              value={number_of_days}
              onChange={handlePostForm}
              placeholder="enter the no of days of tution"
            />
          </div>

          <div className={styles.tuition_type}>
            <label>Medium</label>
            <select
              required
              id="medium"
              value={medium}
              selected
              onChange={handleMediumChange}
            >
              <option value="Bangla">Bangla</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className={styles.tuition_type}>
            <label>Tution Preference</label>
            <select
              required
              id="preference"
              value={tution_preference}
              selected
              onChange={handlePreferenceChange}
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className={styles.post_control}>
            <button type="submit">Post</button>
            <button type="reset">Reset</button>
          </div>
        </form>
        <div className={styles.added_posts}>
          <h1>Previous Posts</h1>
          <div className={styles.previous_posts}>
            {prevposts?.map((prevpost) => (
              <Gurdianpost key={prevpost.tution_id} prevpost={prevpost} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gurdianprofile;
