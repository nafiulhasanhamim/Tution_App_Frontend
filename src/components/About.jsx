import styles from "../css/aboutus.module.css";

const About = () => {
  return (
    <div className={styles.about_container}>
      <div className={styles.facilities}>
        <h1>What's We Offer</h1>
        <p>
        At CUET Tuitionee, we understand the diverse roles that individuals play in the education ecosystem. Whether you're a parent or guardian seeking tutoring services for your child or a teacher looking to provide tutoring support, we have you covered.

        As a parent or guardian, you can easily register with us to access our comprehensive tutoring services. We provide a seamless and user-friendly registration process that allows you to create an account, provide relevant information about your child, and select the subjects and courses they need assistance with. Our dedicated team will then match your child with one of our experienced tutors who best fits their needs, ensuring a personalized learning experience.

        We also welcome teachers who are passionate about sharing their knowledge and expertise with students. If you are a teacher looking to provide tutoring services, you can register with us as a guardian as well. We value the skills and insights that teachers bring to the table, and we believe that their expertise can greatly benefit students outside of the classroom. By registering as a guardian, you can connect with students seeking tutoring in your subject area and help them succeed academically.

        At CUET Tuitionee, we foster a collaborative environment where both guardians and teachers can work together to support students' educational growth. We believe that the combined efforts of dedicated parents, passionate teachers, and motivated students can create a powerful learning experience.

        Join our community of committed educators and enthusiastic learners at CUET Tuitionee. Together, we can make a difference in the lives of students and empower them to achieve their academic goals.
        </p>
      </div>
      <div className={styles.facilities}>
        <h1>For Our Teachers</h1>
        <p>
            <ul>
              <li>
              CUET Tuitionee is a website designed for teachers and students to connect for educational purposes.
              </li>
              <li>
              Teachers must register using their student ID card image to ensure authenticity and verification.
              </li>
              <li>
              Upon registration, teachers create a profile where they can showcase their qualifications, preferences, and hourly payment rates.
              </li>
              <li>
              Guardians post tutoring requests on the website, specifying the subjects or areas of concern.
              </li>
              <li>
              Teachers can browse through these posts to find relevant tutoring opportunities that match their expertise and availability.
              </li>
              <li>
              If interested, teachers can express their interest and initiate contact with the guardians.
              </li>
              <li>
              CUET Tuitionee provides a support system where teachers can contact the platform administrators for any queries, concerns, or technical assistance.
              </li>
              <li>
              The administrators are dedicated to ensuring a smooth user experience for both teachers and guardians.
              </li>
              <li>
              The platform aims to facilitate meaningful connections and effective educational experiences for all users.
              </li>
            </ul>
        </p>
      </div>
      <div className={styles.facilities}>
        <h1>For Our Gurdians</h1>
        <p>
        <ul>
              <li>
              CUET Tuitionee website simplifies the process of finding tutors for guardians and students.</li>
              <li>
              Guardians can register on the platform without authentication.
              </li>
              <li>
              Guardians can easily post their tutoring requirements, specifying subjects or areas of concern.
              </li>
              <li>
              Teacher's profiles are available for guardians to explore, showcasing qualifications, experience, and preferences.
              </li>
              <li>
              Guardians can directly send tuition requests to teachers whose profiles align with their requirements.
              </li>
              <li>
              The platform enables direct communication between guardians and teachers.
              </li>
              <li>
              Guardians have the flexibility to search for tutors based on specific subjects or qualifications.
              </li>
              <li>
              The website provides a transparent and convenient process for arranging tutoring sessions.
              </li>
              <li>
              CUET Tuitionee empowers guardians to connect with suitable teachers effectively.
</li>
            </ul>
        </p>
      </div>
    </div>
  );
};

export default About;