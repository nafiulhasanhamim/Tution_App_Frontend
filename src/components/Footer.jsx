import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "../css/footer.module.css";
const Footer = () => {
  const url = "images/logo.png";
  const pagePath = "/";
  const pageName ="default Name";
  const year = new Date();
  const [email,setEmail] = useState('');
  const [msg,setMsg] = useState('');
  return (
    <div className={styles.main_foot}>
    <div className={styles.foot_container}>
        <div className={styles.foot_description}>
          <img src={url} alt="logo" className={styles.logo}/>
          <p className={styles.description}>
          cuettuitionee.com is a platform where parents, students and tutors can easily connect with each other. We provide qualified Home/Online tutors to help your child with studies and helping them perform better in exams. We are a group of 2,50,000+ Tutors and 30,000+ satisfied parents/students in Dhaka, Chattagram, Rajshahi, Sylhet, Khulna, Barishal, Rangpur, Mymensingh cities for different academic and professional subjects. 
          </p>
        </div>
        <div className={styles.link_list}>
          <ul className ={styles.links}>
            <p> Resources </p>
            <li><NavLink to="/">Home</NavLink></li>  
            <li><NavLink to="/about">About Us</NavLink></li>  
            <li><NavLink to="/contact">Contact Us</NavLink></li>  
            <li><NavLink to={pagePath}>{pageName}</NavLink></li>  
          </ul>
          <div className={styles.social_link}>
            <a href="#"><img src="images/facebook.png"/></a>
            <a href="#"><img src="images/gitw.png"/></a>
            <a href="#"> <img src="images/new.png"/></a>
          </div>
        </div>
        <div className={styles.contactme}>
            <form className={styles.form_foot}>
                <input type="email" required placeholder="Enter your email" onChange={(e)=>{
                  setEmail(e.target.value);
                }}/>
                <textarea required rows="7" cols="40" placeholder="your suggestions here..." onChange={(e)=>{
                  setMsg(e.target.value);
                }}/>
                <button type="submit" onClick={(e)=>{
                  e.preventDefault();
                }}>SEND</button>
            </form>
        </div>
    </div>
    <div className={styles.foot}>
      Copyright ©{year.getFullYear()} All Right Reserved
    </div>
    </div>
  );
};

export default Footer;