import styles from '../css/contact.module.css';
import { NavLink } from 'react-router-dom';
const Contact = () => {
  return (
    <div className={styles.contact_container}>
      <div className={styles.contact_location}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8928.89529852174!2d91.96994093312966!3d22.45790758767303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1689599352638!5m2!1sen!2sbd"   loading="lazy"></iframe>
      </div>
      <div className={styles.home_contact} >
            <div className={styles.contact_heading} >
                <h1>Contact Us</h1>
            </div>
            <div className={styles.contact_details}>
                <div className={styles.member_one}>
                    <div className={styles.member_head}>
                        <img src="../../images/img.jpg"/>
                    </div>
                    <div className={styles.member_body}>
                        <div className={styles.member_name}>
                            <h1>Md. Nafiul Islam Hamim</h1>
                        </div>
                        <div className={styles.member_prop}>
                            <p>CSE Undergrade</p>
                        </div>
                       <div className={styles.member_contact}>
                            <div className={styles.icon}>
                                <a href="#"><img src="../../images/facebook.png"/></a>
                            </div>
                            <div className={styles.icon}>
                                <a href="#"><img src="../../images/new.png"/></a>
                            </div>
                            <div className={styles.icon}>
                                <a href="#"><img src="../../images/github.png"/></a>
                            </div>
                       </div>
                    </div>
                </div>
                <div className={`${styles.member_one} ${styles.mem_active}`}>
                    <div className={styles.member_head}>
                        <img src="../../images/img.jpg"/>
                    </div>
                    <div className={styles.member_body}>
                        <div className={styles.member_name}>
                            <h1>Rezoan Ahmed Abir</h1>
                        </div>
                        <div className={styles.member_prop}>
                            <p>CSE Undergrade</p>
                        </div>
                       <div className={styles.member_contact}>
                            <div className={styles.icon}>
                                <a href="#"><img src="../../images/facebook.png"/></a>
                            </div>
                            <div className={styles.icon}>
                                <a href="#"><img src="../../images/new.png"/></a>
                            </div>
                            <div className={styles.icon}>
                                <a href="#"><img src="../../images/github.png"/></a>
                            </div>
                       </div>
                    </div>
                </div>
                <div className={styles.member_one}>
                    <div className={styles.member_head}>
                        <img src="../../images/img.jpg"/>
                    </div>
                    <div className={styles.member_body}>
                        <div className={styles.member_name}>
                            <h1>Ariful Islam</h1>
                        </div>
                        <div className={styles.member_prop}>
                            <p>CSE Undergrade</p>
                        </div>
                       <div className={styles.member_contact}>
                            <div className={styles.icon}>
                                <a href="#"><img src="../../images/facebook.png"/></a>
                            </div>
                            <div className={styles.icon}>
                                <a href="#"><img src="../../images/new.png"/></a>
                            </div>
                            <div className={styles.icon}>
                                <a href="#"><img src="../../images/github.png"/></a>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.offer}>
              <p>Want To Join Us</p>
              <button type="button"><NavLink to="">Click Here</NavLink></button>
        </div>
    </div>
  );
};

export default Contact;