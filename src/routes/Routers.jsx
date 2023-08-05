import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/Contact";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Gurdianprofile from "../components/Gurdianprofile";
import Tutorprofile from "../components/Tutorprofile";
import Tutorfiltering from "../components/Tutorfiltering";
import Postfiltering from "../components/Postfiltering";
import AllLocations from "../adminComponents/AllLocations";
import AddLocation from "../adminComponents/AddLocation";
import GuardianList from "../adminComponents/GuardianList";
import PendingTutors from "../adminComponents/PendingTutors";
import ApprovedTutors from "../adminComponents/ApprovedTutors";
import AllApprovedTutions from "../adminComponents/AllApprovedTutions";
import PendingTutions from "../adminComponents/PendingTutions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import Error from "../components/Error";
import Logout from "../components/Logout";
import Applications from "../components/Applications";
import AssignedTutions from "../components/AssignedTutions";

const Routers = () => {
  const role = useSelector((state) => state.userinfo.userinfo.role);
  return (
    <BrowserRouter>
      {/* <Header /> */}
      {role !== "admin" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        {role === "guardian" && (
          <Route path="/guardianprofile" element={<Gurdianprofile />} />
        )}
        {role === "tutor" && (
          <>
            <Route path="/tutorprofile" element={<Tutorprofile />} />
            <Route path="/postfiltering" element={<Postfiltering />} />
          </>
        )}
        {role === "guardian" && (
          <>
            <Route path="/tutorfiltering" element={<Tutorfiltering />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/all-assigned-tutions" element={<AssignedTutions />} />
          </>
        )}
        {/* {role === "tutor" && (
          <Route path="/postfiltering" element={<Postfiltering />} />
        )} */}
        {role === "admin" && (
          <>
            <Route path="/admin/get-all-locations" element={<AllLocations />} />
            <Route path="/admin/add-location" element={<AddLocation />} />
            <Route path="/admin/get-all-guardians" element={<GuardianList />} />
            <Route
              path="/admin/get-all-pending-tutors"
              element={<PendingTutors />}
            />
            <Route
              path="/admin/get-all-approved-tutors"
              element={<ApprovedTutors />}
            />
            <Route
              path="/admin/get-all-approved-tutions"
              element={<AllApprovedTutions />}
            />
            <Route
              path="/admin/get-all-pending-tutions"
              element={<PendingTutions />}
            />
          </>
        )}
        <Route path="*" element={<Error />} />
      </Routes>
      {role !== "admin" && <Footer />}
    </BrowserRouter>
  );
};

export default Routers;
